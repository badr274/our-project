<?php

namespace App\Repositories;

use App\Models\Order;

class OrderRepository
{

    public function getOrders()
    {
        return Order::where('user_id', auth()->user()->id)->get();
    }

    public function createOrder($data)
    {
        return Order::create($data);
    }

    public function getAllOrders()
    {
        return Order::with(['user:id,name'])->get();
    }

    public function updateOrderStatus($order, $status)
    {
        return $order->update(['status' => $status]);
    }

    public function deleteOrder($order)
    {
        return $order->delete();
    }
}
