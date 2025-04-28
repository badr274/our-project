<?php

namespace App\Http\Controllers\API\Wishlist;

use App\Http\Controllers\Controller;
use App\Models\Wishlist;
use App\Http\Requests\API\Wishlist\WishlistRequest;

class WishlistController extends Controller
{

    public function index()
    {
        $wishlists = Wishlist::where('user_id', auth()->user()->id)->get();
        return response()->json(['wishlists' => $wishlists], 200);
    }

    public function store(WishlistRequest $request)
    {
        Wishlist::create([
            'user_id' => auth()->user()->id,
            'product_id' => $request->product_id,
        ]);
        $wishlist = Wishlist::where('user_id', auth()->user()->id)->get();
        return response()->json([
            'message' => 'Product added to wishlist successfully',
            'wishlist' => $wishlist
        ], 201);
    }

    public function destroy(Wishlist $wishlist)
    {
        $wishlist->delete();
        return response()->json(['message' => 'Product removed from wishlist successfully'], 200);
    }
}
