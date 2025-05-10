<?php


namespace App\Services\Wishlist;

use App\Repositories\WishlistRepository;
use App\Services\Product\ProductService;


class WishlistService
{

    protected WishlistRepository $wishlistRepository;
    protected ProductService $productService;


    public function __construct(WishlistRepository $wishlistRepository, ProductService $productService)
    {
        $this->wishlistRepository = $wishlistRepository;
        $this->productService = $productService;
    }

    public function getWishlists($userId)
    {
        return $this->wishlistRepository->getWishlists($userId);
    }

    public function addToWishlist($userId, $productId)
    {
        $this->wishlistRepository->addToWishlist($userId, $productId);
        return $this->getWishlists($userId);
    }

    public function removeFromWishlist($id)
    {
        $this->wishlistRepository->removeFromWishlist($id);
        return $this->getWishlists(auth()->user()->id);
    }
}
