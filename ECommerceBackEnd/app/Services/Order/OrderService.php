<?php

namespace App\Services\Order;

use App\Repositories\OrderRepository;
use App\Repositories\CartRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderService
{
    protected OrderRepository $orderRepo;
    protected CartRepository $cartRepo;

    public function __construct(OrderRepository $orderRepo, CartRepository $cartRepo)
    {
        $this->orderRepo = $orderRepo;
        $this->cartRepo = $cartRepo;
    }

    public function getAllOrders()
    {
        return $this->orderRepo->getAllOrders();
    }

    public function getOrders(int $userId)
    {
        return $this->orderRepo->getOrders($userId);
    }

    public function createOrder(array $data)
    {
        return DB::transaction(function () use ($data) {
            $userId = Auth::id();
            $cartItems = $this->validateAndGetCartItems($userId);
            $orderData = $this->prepareOrderData($cartItems, $data);
            $order = $this->createOrderRecord($orderData);
            $this->attachProductsToOrder($order, $orderData['productData']);
            $this->cartRepo->clearCart($userId);
            return $this->orderRepo->getOrders($userId);
        });
    }

    private function validateAndGetCartItems(int $userId)
    {
        $cartItems = $this->cartRepo->getCartByUserId($userId);
        if ($cartItems->isEmpty()) {
            throw new \Exception("Cart is empty");
        }
        return $cartItems;
    }

    private function prepareOrderData($cartItems, array $data): array
    {
        $productData = [];
        $totalPrice = 0;

        foreach ($cartItems as $item) {
            $price = $this->calculateDiscountedPrice($item->product);
            $productData[$item->product_id] = [
                'quantity' => $item->quantity,
                'price_at_order' => $price,
            ];
            $totalPrice += $item->quantity * $price;
        }

        return [
            'user_id' => Auth::id(),
            'total_price' => $totalPrice,
            'address' => $data['address'],
            'phone' => $data['phone'],
            'productData' => $productData
        ];
    }

    private function calculateDiscountedPrice($product): float
    {
        return $product->price - ($product->price * $product->discount / 100);
    }

    private function createOrderRecord(array $orderData)
    {
        return $this->orderRepo->createOrder([
            'user_id' => $orderData['user_id'],
            'total_price' => $orderData['total_price'],
            'address' => $orderData['address'],
            'phone' => $orderData['phone'],
        ]);
    }

    private function attachProductsToOrder($order, array $productData): void
    {
        $order->products()->attach($productData);
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

    public function updateOrderStatus($order, int $status)
    {
        return $this->orderRepo->updateOrderStatus($order, $status);
    }

    public function deleteOrder($order)
    {
        return $this->orderRepo->deleteOrder($order);
    }
}
