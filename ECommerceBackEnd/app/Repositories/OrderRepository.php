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
}
