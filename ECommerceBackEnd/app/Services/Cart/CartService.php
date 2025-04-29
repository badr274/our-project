<?php

namespace App\Services\Cart;

use App\Repositories\CartRepository;
use App\Repositories\ProductRepository;
use App\Services\Product\ProductService;

class CartService
{
    protected CartRepository $cartRepo;
    protected ProductService $productService;
    protected ProductRepository $productRepo;

    public function __construct(CartRepository $cartRepo, ProductService $productService, ProductRepository $productRepo)
    {
        $this->cartRepo = $cartRepo;
        $this->productService = $productService;
        $this->productRepo = $productRepo;
    }

    public function getCartByUserId($userId)
    {
        return $this->cartRepo->getCartByUserId($userId);
    }

    public function addToCart($userId, $productId, $quantity)
    {
        $this->productService->checkStock($productId, $quantity);
        $cart = $this->cartRepo->findcart($userId, $productId);
        if ($cart) {
            $this->cartRepo->updateCart($userId, ['quantity' => $cart->quantity + $quantity]);
        } else {
            $this->cartRepo->addToCart($userId, $productId, $quantity);
        }
        $this->productRepo->decrementStock($productId, $quantity);
        return $this->cartRepo->getCartByUserId($userId);
    }

    public function removeFromCart($id)
    {
        $cart = $this->cartRepo->find($id);
        $this->productRepo->incrementStock($cart->product_id, $cart->quantity);
        $this->cartRepo->removeFromCart($id);
    }
}
