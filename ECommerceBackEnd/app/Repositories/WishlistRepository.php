<?php

namespace App\Repositories;

use App\Models\Wishlist;

class WishlistRepository
{
    public function getWishlists($userId)
    {
        return Wishlist::with('product')->where('user_id', $userId)->get();
    }

    public function addToWishlist($userId, $productId)
    {
        Wishlist::create([
            'user_id' => $userId,
            'product_id' => $productId,
        ]);
    }

    public function removeFromWishlist($id)
    {
        Wishlist::where('id', $id)->delete();
    }
}
