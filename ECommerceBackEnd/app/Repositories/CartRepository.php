<?php

namespace App\Repositories;

use App\Models\Cart;

class CartRepository
{
    public function getCartByUserId($userId)
    {
        return Cart::with(['product:id,title,price,discount,image'])
            ->where('user_id', $userId)
            ->get();
    }

    public function find($id)
    {
        return Cart::findOrFail($id);
    }

    public function findcart($userId, $productId)
    {
        return Cart::where('user_id', $userId)->where('product_id', $productId)->first();
    }

    public function addToCart($userId, $productId, $quantity)
    {
        Cart::create([
            'user_id' => $userId,
            'product_id' => $productId,
            'quantity' => $quantity,
        ]);
    }

    public function removeFromCart($id)
    {
        Cart::where('id', $id)->delete();
    }

    public function updateCart($userId, $data)
    {
        Cart::where('user_id', $userId)->update($data);
    }
}
