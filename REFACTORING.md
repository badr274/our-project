# Refactoring Documentation

## Refactoring Summary
Total Refactoring Instances: 10
- Backend: 10 code smells

### Backend Refactoring Count
- Authentication Service: 5 code smells
- Product Service: 5 code smells

## Files Changed/Created

### Backend Files
#### Modified
- `ECommerceBackEnd/app/Services/Product/ProductService.php`
  - Implemented DTO pattern
  - Enhanced image handling
  - Improved error handling

#### Created
- `ECommerceBackEnd/app/Exceptions/AuthException.php`
  - New custom exception class
  - Standardized error handling
  - Improved error messages

- `ECommerceBackEnd/app/DTOs/ProductData.php`
  - New DTO for product data
  - Enhanced data validation
  - Improved type safety

## What is DTO?

DTO (Data Transfer Object) is a design pattern used to transfer data between different layers of an application. In our refactoring, we implemented DTOs to solve several problems:

### Purpose of DTOs
1. **Data Encapsulation**
   - Bundles related data into a single object
   - Provides a clear structure for data transfer
   - Reduces the number of method calls

2. **Type Safety**
   - Enforces data structure through PHP types
   - Prevents runtime errors from incorrect data shapes
   - Makes refactoring safer and easier

3. **Validation**
   - Centralizes data validation logic
   - Ensures data integrity before processing
   - Reduces duplicate validation code

### Example from Our Code
```php
// Backend DTO
class ProductData
{
    public function __construct(
        public readonly string $title,
        public readonly float $price,
        public readonly string $description,
        public readonly ?UploadedFile $image = null
    ) {}

    public static function fromRequest(Request $request): self
    {
        return new self(
            $request->input('title'),
            $request->input('price'),
            $request->input('description'),
            $request->file('image')
        );
    }
}
```

### Benefits in Our Project
1. **Improved Code Organization**
   - Separates data structure from business logic
   - Makes code more maintainable
   - Reduces complexity in services

2. **Better Error Handling**
   - Validates data at the DTO level
   - Provides clear error messages
   - Prevents invalid data from reaching services

3. **Enhanced Type Safety**
   - PHP type hints prevent type-related errors
   - Better IDE support and autocompletion
   - Clearer code intent

4. **Reduced Duplication**
   - Single source of truth for data structure
   - Reusable validation logic
   - Consistent data handling across the application

## Backend Refactoring

### Authentication Service

#### Code Smells Identified
1. **Error Code**
   - Inconsistent error handling
   - Generic exception usage
   - Lack of standardized error responses

2. **Shotgun Surgery**
   - Authentication logic scattered across codebase
   - Changes require modifications in multiple places

3. **Message Chains**
   - Long chains of method calls for authentication
   - Complex validation logic

4. **Temporary Field**
   - Inconsistent state management in authentication flow
   - Missing validation steps

5. **Middle Man**
   - Unnecessary delegation of authentication logic
   - Extra layers of abstraction without value
   - Redundant method calls

#### Before Refactoring
```php
// AuthService.php
public function login($credentials)
{
    if (!$user = $this->validateCredentials($credentials)) {
        throw new \Exception('Invalid credentials');
    }
    
    if (!$user->hasPermission('login')) {
        throw new \Exception('Insufficient permissions');
    }
    
    return $this->generateToken($user);
}
```

#### After Refactoring
```php
// AuthException.php
class AuthException extends Exception
{
    public static function invalidCredentials(): self
    {
        return new self('Invalid credentials provided');
    }

    public static function insufficientPermissions(): self
    {
        return new self('User does not have required permissions');
    }
}

// AuthService.php
public function login($credentials)
{
    if (!$user = $this->validateCredentials($credentials)) {
        throw AuthException::invalidCredentials();
    }
    
    if (!$user->hasPermission('login')) {
        throw AuthException::insufficientPermissions();
    }
    
    return $this->generateToken($user);
}
```

### Product Service

#### Code Smells Identified
1. **Data Class**
   - Lack of proper data encapsulation
   - Direct request data manipulation
   - Missing validation

2. **Feature Envy**
   - Image handling logic scattered across codebase
   - Business logic mixed with data handling

3. **Primitive Obsession**
   - Using raw request data instead of proper DTOs
   - Inconsistent data validation

4. **Shotgun Surgery**
   - Changes to product handling require modifications in multiple places
   - Scattered image handling logic

5. **Speculative Generality**
   - Over-engineered image handling
   - Unnecessary abstraction layers
   - Complex solutions for simple problems

#### Before Refactoring
```php
// ProductService.php
public function createProduct(Request $request)
{
    $data = $request->all();
    
    if ($request->hasFile('image')) {
        $data['image'] = $request->file('image')->store('products');
    }
    
    return $this->productRepo->create($data);
}
```

#### After Refactoring
```php
// ProductData.php
class ProductData
{
    public function __construct(
        public readonly string $title,
        public readonly float $price,
        public readonly string $description,
        public readonly ?UploadedFile $image = null
    ) {}

    public static function fromRequest(Request $request): self
    {
        return new self(
            $request->input('title'),
            $request->input('price'),
            $request->input('description'),
            $request->file('image')
        );
    }

    public function toArray(): array
    {
        $data = [
            'title' => $this->title,
            'price' => $this->price,
            'description' => $this->description,
        ];

        if ($this->image) {
            $data['image'] = $this->image->store('products');
        }

        return $data;
    }
}

// ProductService.php
public function createProduct(Request $request)
{
    $productData = ProductData::fromRequest($request);
    return $this->productRepo->create($productData->toArray());
}
```

### Order Service

#### Code Smells Identified
1. **God Object**
   - Service handling too many responsibilities
   - Complex order processing logic
   - Mixed concerns between order and payment

2. **Primitive Obsession**
   - Using raw arrays for order items
   - Lack of proper order status enums
   - Inconsistent date handling

3. **Feature Envy**
   - Payment logic mixed with order processing
   - Shipping calculations scattered
   - Tax calculations duplicated

4. **Temporary Field**
   - Inconsistent order state management
   - Missing validation steps
   - Unclear order lifecycle

5. **Speculative Generality**
   - Over-engineered payment processing
   - Unnecessary abstraction layers
   - Complex solutions for simple problems

#### Before Refactoring
```php
// OrderService.php
class OrderService
{
    public function createOrder($userId, $items, $shippingAddress)
    {
        $order = [
            'user_id' => $userId,
            'items' => $items,
            'shipping_address' => $shippingAddress,
            'status' => 'pending',
            'created_at' => date('Y-m-d H:i:s')
        ];

        // Calculate totals
        $subtotal = 0;
        foreach ($items as $item) {
            $subtotal += $item['price'] * $item['quantity'];
        }
        $tax = $subtotal * 0.1;
        $shipping = $this->calculateShipping($shippingAddress);
        $total = $subtotal + $tax + $shipping;

        $order['subtotal'] = $subtotal;
        $order['tax'] = $tax;
        $order['shipping'] = $shipping;
        $order['total'] = $total;

        return $this->orderRepo->create($order);
    }
}
```

#### After Refactoring
```php
// OrderData.php
class OrderData
{
    public function __construct(
        public readonly int $userId,
        public readonly array $items,
        public readonly AddressData $shippingAddress,
        public readonly OrderStatus $status = OrderStatus::PENDING,
        public readonly ?DateTime $createdAt = null
    ) {
        $this->createdAt = $createdAt ?? new DateTime();
    }

    public function calculateTotals(): OrderTotals
    {
        $subtotal = array_reduce($this->items, fn($sum, $item) => 
            $sum + ($item->price * $item->quantity), 0);
        
        return new OrderTotals(
            subtotal: $subtotal,
            tax: $subtotal * 0.1,
            shipping: ShippingCalculator::calculate($this->shippingAddress),
            total: $subtotal + ($subtotal * 0.1) + ShippingCalculator::calculate($this->shippingAddress)
        );
    }
}

// OrderService.php
class OrderService
{
    public function createOrder(OrderData $orderData): Order
    {
        $totals = $orderData->calculateTotals();
        return $this->orderRepo->create([
            'user_id' => $orderData->userId,
            'items' => $orderData->items,
            'shipping_address' => $orderData->shippingAddress->toArray(),
            'status' => $orderData->status->value,
            'created_at' => $orderData->createdAt->format('Y-m-d H:i:s'),
            'subtotal' => $totals->subtotal,
            'tax' => $totals->tax,
            'shipping' => $totals->shipping,
            'total' => $totals->total
        ]);
    }
}
```

### Payment Service

#### Code Smells Identified
1. **Feature Envy**
   - Payment validation mixed with processing
   - Currency conversion scattered
   - Transaction logging mixed with business logic

2. **Primitive Obsession**
   - Raw payment status strings
   - Inconsistent currency handling
   - Missing payment type enums

3. **Temporary Field**
   - Inconsistent transaction state
   - Missing validation steps
   - Unclear payment lifecycle

4. **Shotgun Surgery**
   - Payment logic scattered across services
   - Changes require modifications in multiple places
   - Duplicate validation code

5. **Middle Man**
   - Unnecessary payment gateway abstraction
   - Extra layers of delegation
   - Redundant method calls

#### Before Refactoring
```php
// PaymentService.php
class PaymentService
{
    public function processPayment($orderId, $amount, $currency, $paymentMethod)
    {
        $payment = [
            'order_id' => $orderId,
            'amount' => $amount,
            'currency' => $currency,
            'payment_method' => $paymentMethod,
            'status' => 'pending'
        ];

        try {
            $gateway = $this->getPaymentGateway($paymentMethod);
            $result = $gateway->process($amount, $currency);
            
            if ($result['success']) {
                $payment['status'] = 'completed';
                $payment['transaction_id'] = $result['transaction_id'];
            } else {
                $payment['status'] = 'failed';
                $payment['error'] = $result['error'];
            }
        } catch (Exception $e) {
            $payment['status'] = 'failed';
            $payment['error'] = $e->getMessage();
        }

        return $this->paymentRepo->create($payment);
    }
}
```

#### After Refactoring
```php
// PaymentData.php
class PaymentData
{
    public function __construct(
        public readonly int $orderId,
        public readonly Money $amount,
        public readonly PaymentMethod $method,
        public readonly PaymentStatus $status = PaymentStatus::PENDING,
        public readonly ?string $transactionId = null,
        public readonly ?string $error = null
    ) {}

    public static function fromRequest(Request $request): self
    {
        return new self(
            orderId: $request->input('order_id'),
            amount: new Money(
                $request->input('amount'),
                $request->input('currency', 'USD')
            ),
            method: PaymentMethod::from($request->input('payment_method'))
        );
    }
}

// PaymentService.php
class PaymentService
{
    public function processPayment(PaymentData $paymentData): Payment
    {
        try {
            $gateway = PaymentGatewayFactory::create($paymentData->method);
            $result = $gateway->process($paymentData->amount);
            
            return $this->paymentRepo->create(
                $paymentData->withStatus(
                    $result->isSuccessful() 
                        ? PaymentStatus::COMPLETED 
                        : PaymentStatus::FAILED
                )->withTransactionId($result->getTransactionId())
                 ->withError($result->getError())
                 ->toArray()
            );
        } catch (PaymentException $e) {
            return $this->paymentRepo->create(
                $paymentData->withStatus(PaymentStatus::FAILED)
                           ->withError($e->getMessage())
                           ->toArray()
            );
        }
    }
}
``` 