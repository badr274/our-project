# Refactoring Documentation

## Backend Refactoring

### Payment Service

#### Code Smells Identified

- **Long Method**

#### Before Refactoring

```php
// PaymentService.php
    public function createPaymentIntent(array $data)
    {
        Stripe::setApiKey(env('STRIPE_SECRET_KEY'));

        $currency = 'usd';
        try {
            $paymentIntent = PaymentIntent::create([
                'amount' => $data['amount'] * 100,
                'currency' => $currency,
                'payment_method_types' => ['card'],
            ]);

            return [
                'clientSecret' => $paymentIntent->client_secret,
                'user' => auth()->user()
            ];
        } catch (\Exception $e) {
            return [
                'error' => $e->getMessage(),
            ];
        }
    }
```

#### After Refactoring

```php
// PaymentService.php
const DEFAULT_CURRENCY = 'usd';
    const SUPPORTED_METHODS = ['card'];

    public function createPaymentIntent(array $data)
    {
        try {
            $this->initializeStripe();

            $paymentIntent = PaymentIntent::create(
                $this->buildPaymentIntentPayload($data['amount'])
            );

            return [
                'clientSecret' => $paymentIntent->client_secret,
                'user' => auth()->user(),
            ];

        } catch (\Exception $e) {
            return [
                'error' => $e->getMessage(),
            ];
        }
    }

    private function initializeStripe(): void
    {
        Stripe::setApiKey(env('STRIPE_SECRET_KEY'));
    }

    private function buildPaymentIntentPayload(float $amount): array
    {
        return [
            'amount' => intval($amount * 100),
            'currency' => self::DEFAULT_CURRENCY,
            'payment_method_types' => self::SUPPORTED_METHODS,
        ];
    }
```

### Order Service

#### Code Smells Identified

- **Long Method**

#### Before Refactoring

```php
// OrderService.php
    public function createOrder(array $data)
    {
        return DB::transaction(function () use ($data) {
            $userId = Auth::id();
            $cartItems = $this->cartRepo->getCartByUserId($userId);

            if ($cartItems->isEmpty()) {
                throw new \Exception("Cart is empty");
            }

            $productData = [];
            $totalPrice = 0;

            foreach ($cartItems as $item) {
                $price = $item->product->price - ($item->product->price * $item->product->discount / 100);
                $productData[$item->product_id] = [
                    'quantity'        => $item->quantity,
                    'price_at_order'  => $price,
                ];
                $totalPrice += $item->quantity * $price;
            }

            $order = $this->orderRepo->createOrder([
                'user_id'     => $userId,
                'total_price' => $totalPrice,
                'address'     => $data['address'],
                'phone'       => $data['phone'],
            ]);

            $order->products()->attach($productData);
            $this->cartRepo->clearCart($userId);

            return $this->orderRepo->getOrders($userId);
        });
    }

    public function getOrder(int $orderId)
    {
        $order = $this->orderRepo->getOrder($orderId);
        $order->load('products');

        return [
            'id' => $order->id,
            'total_price' => $order->total_price,
            'address' => $order->address,
            'phone' => $order->phone,
            'status' => $order->status,
            'products' => $order->products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'title' => $product->title,
                    'quantity' => $product->pivot->quantity,
                    'price_at_order' => $product->pivot->price_at_order,
                ];
            }),
        ];
    }
```

#### After Refactoring

```php
// OrderService.php
    public function createOrder(array $data)
    {
        return DB::transaction(function () use ($data) {
            $userId = Auth::id();
            $cartItems = $this->cartRepo->getCartByUserId($userId);

            if ($cartItems->isEmpty()) {
                throw new \Exception("Cart is empty");
            }

            [$productData, $totalPrice] = $this->prepareOrderDetails($cartItems);

            $order = $this->orderRepo->createOrder([
                'user_id'     => $userId,
                'total_price' => $totalPrice,
                'address'     => $data['address'],
                'phone'       => $data['phone'],
            ]);

            $order->products()->attach($productData);
            $this->cartRepo->clearCart($userId);

            return $this->orderRepo->getOrders($userId);
        });
    }

    public function getOrder(int $orderId): array
    {
        $order = $this->orderRepo->getOrder($orderId);
        $order->load('products');

        return $this->formatOrderDetails($order);
    }

    protected function prepareOrderDetails($cartItems): array
    {
        $productData = [];
        $totalPrice = 0;

        foreach ($cartItems as $item) {
            $price = $this->calculateDiscountedPrice($item->product->price, $item->product->discount);
            $productData[$item->product_id] = [
                'quantity' => $item->quantity,
                'price_at_order' => $price,
            ];
            $totalPrice += $item->quantity * $price;
        }

        return [$productData, $totalPrice];
    }

    protected function calculateDiscountedPrice(float $price, float $discount): float
    {
        return $price - ($price * $discount / 100);
    }

    protected function formatOrderDetails(Order $order): array
    {
        return [
            'id' => $order->id,
            'total_price' => $order->total_price,
            'address' => $order->address,
            'phone' => $order->phone,
            'status' => $order->status,
            'products' => $order->products->map(function ($product) {
                return [
                    'id' => $product->id,
                    'title' => $product->title,
                    'quantity' => $product->pivot->quantity,
                    'price_at_order' => $product->pivot->price_at_order,
                ];
            }),
        ];
    }
```

### Product Service

#### Code Smells Identified

- **Duplicated Code**

#### Before Refactoring

```php
// ProductService.php
    public function createProduct(Request $request, array $data)
    {
        $data['image'] = $request->file('image')->store('products', 'public');

        return $this->productRepo->create($data);
    }

    public function updateProduct(Product $product, array $data, Request $request)
    {
        if ($request->hasFile('image')) {
            Storage::disk('public')->delete($product->image);
            $data['image'] = $request->file('image')->store('products', 'public');
        }
        return $this->productRepo->update($product, $data);
    }

    public function deleteProduct(Product $product)
    {
        if (Storage::disk('public')->exists($product->image)){
            Storage::disk('public')->delete($product->image);
        }
        $this->productRepo->delete($product);
    }
```

#### After Refactoring

```php
// ProductService.php
    public function createProduct(Request $request, array $data)
    {
        $data['image'] = $this->handleImageUpload($request, 'products');

        return $this->productRepo->create($data);
    }

    public function updateProduct(Product $product, array $data, Request $request)
    {
        $newImage = $this->handleImageUpload($request, 'products', $product->image);
        if ($newImage) {
            $data['image'] = $newImage;
        }
        return $this->productRepo->update($product, $data);
    }

    public function deleteProduct(Product $product)
    {
        $this->deleteImage($product->image, 'products');
        $this->productRepo->delete($product);
    }
// HasImage
namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

trait HasImage
{
    public function handleImageUpload(Request $request, string $folder = 'uploads', $oldImage = null): ?string
    {
        if (!$request->hasFile('image')) {
            return null;
        }

        $this->deleteImage($oldImage, $folder);

        return $request->file('image')->store($folder, 'public');
    }

    public function deleteImage(?string $img, string $folder = 'uploads'): void
    {
        if ($img && Storage::disk('public')->exists($img)) {
            Storage::disk('public')->delete($img);
        }
    }
}
```

### Cart Service

#### Code Smells Identified

- **Feature Envy**

- **Duplicated Code**

#### Before Refactoring

```php
// CartService
    public function addToCart($userId, $productId, $quantity)
    {
        $product = $this->productRepo->find($id);
        if ($product->stock < $quantity) {
            throw new \Exception('Not enough stock');
        }
        $cart = $this->cartRepo->findcart($userId, $productId);
        if ($cart) {
            $this->cartRepo->updateCart($cart->id, ['quantity' => $cart->quantity + $quantity]);
        } else {
            $this->cartRepo->addToCart($userId, $productId, $quantity);
        }
        $product->stock -= $quantity;
        $product->save();
        return $this->cartRepo->getCartByUserId($userId);
    }

    public function updateCart($id, $quantity)
    {
        $cart = $this->cartRepo->find($id);
        $product = $this->productRepo->find($cart->product_id);
        if ($product->stock < $quantity) {
            throw new \Exception('Not enough stock');
        }
        $this->cartRepo->updateCart($cart->id, ['quantity' => $quantity]);
        $product->stock = $product->stock + ($cart->quantity - $quantity);
        $product->save();
        return $this->getCartByUserId($cart->user_id);
    }

    public function removeFromCart($id)
    {
        $cart = $this->cartRepo->find($id);
        $product = Product::findOrFail($cart->product_id);
        $product->stock += $quantity;
        $product->save();
        $this->cartRepo->removeFromCart($id);
        return $this->getCartByUserId($cart->user_id);
    }
```

#### After Refactoring

```php
// CartService
    public function addToCart($userId, $productId, $quantity)
    {
        $this->productService->checkStock($productId, $quantity);
        $cart = $this->cartRepo->findcart($userId, $productId);
        if ($cart) {
            $this->cartRepo->updateCart($cart->id, ['quantity' => $cart->quantity + $quantity]);
        } else {
            $this->cartRepo->addToCart($userId, $productId, $quantity);
        }
        $this->productService->decrementStock($productId, $quantity);
        return $this->cartRepo->getCartByUserId($userId);
    }

    public function updateCart($id, $quantity)
    {
        $cart = $this->cartRepo->find($id);
        $this->productService->checkStock($cart->product_id, $quantity);
        $this->cartRepo->updateCart($cart->id, ['quantity' => $quantity]);
        $this->productService->decrementStock($cart->product_id, $quantity - $cart->quantity);
        return $this->getCartByUserId($cart->user_id);
    }

    public function removeFromCart($id)
    {
        $cart = $this->cartRepo->find($id);
        $this->productService->incrementStock($cart->product_id, $cart->quantity);
        $this->cartRepo->removeFromCart($id);
        return $this->getCartByUserId($cart->user_id);
    }
```

### Auth Service

#### Code Smells Identified

- **Duplicated Code**

#### Before Refactoring

```php
    public function register(array $data)
    {
        $user = $this->userRepository->create($data);
        $token = $user->createToken("auth_token")->plainTextToken;
        return ['token' => $token, 'user' => $user];
    }

    public function login(array $data, string $role)
    {
        $user = $this->userRepository->findByEmail($data['email']);

        if (!$user || !Hash::check($data['password'], $user->password)) {
            throw AuthException::invalidCredentials();
        }

        if ($role === 'admin' && !in_array($user->role, ['admin', 'manager'])) {
            throw AuthException::insufficientPermissions();
        }
        if ($user->role === 'admin' || $user->role === 'manager'){

            $token = $user->createToken("admin-token")->plainTextToken;
        } elseif($user->role === 'user'){

            $token = $user->createToken("auth_token")->plainTextToken;
        }
        return ['token' => $token, 'user' => $user];
    }
```

#### After Refactoring

```php
    public function register(array $data)
    {
        $user = $this->userRepository->create($data);
        $token = $this->createUserToken($user, 'user');
        return ['token' => $token, 'user' => $user];
    }

    public function login(array $data, string $role)
    {
        $user = $this->userRepository->findByEmail($data['email']);

        if (!$user || !Hash::check($data['password'], $user->password)) {
            throw AuthException::invalidCredentials();
        }

        if ($role === 'admin' && !in_array($user->role, ['admin', 'manager'])) {
            throw AuthException::insufficientPermissions();
        }

        $token = $this->createUserToken($user, $role);
        return ['token' => $token, 'user' => $user];
    }

    private function createUserToken($user, string $role): string
    {
        $tokenName = match ($role) {
            'admin', 'manager' => 'admin-token',
            default => 'auth_token'
        };
        return $user->createToken($tokenName)->plainTextToken;
    }
```
