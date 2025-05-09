<?php

namespace App\Http\Controllers\API\Web\Wishlist;

use App\Http\Controllers\Controller;
use App\Models\Wishlist;
use App\Http\Requests\API\Web\Wishlist\WishlistRequest;
use App\Services\Wishlist\WishlistService;

class WishlistController extends Controller
{

    protected WishlistService $wishlistService;

    public function __construct(WishlistService $wishlistService)
    {
        $this->wishlistService = $wishlistService;
    }

    public function index()
    {
        $wishlists = $this->wishlistService->getWishlists(auth()->user()->id);
        return response()->json(['wishlists' => $wishlists], 200);
    }

    public function store(WishlistRequest $request)
    {
        $wishlists = $this->wishlistService->addToWishlist(auth()->user()->id, $request->product_id);
        return response()->json([
            'message' => 'Product added to wishlist successfully',
            'wishlists' => $wishlists
        ], 201);
    }

    public function destroy(Wishlist $wishlist)
    {
        $wishlists = $this->wishlistService->removeFromWishlist($wishlist->id);
        return response()->json(['message' => 'Product removed from wishlist successfully', 'wishlists' => $wishlists], 200);
    }
}
