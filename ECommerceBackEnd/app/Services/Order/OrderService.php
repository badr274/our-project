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

    public function getOrders(int $userId)
    {
        return $this->orderRepo->getOrders($userId);
    }

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
}
