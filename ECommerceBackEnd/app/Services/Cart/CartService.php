<?php

namespace App\Services\Cart;

use App\Repositories\CartRepository;
use App\Services\Product\ProductService;

class CartService
{
    protected CartRepository $cartRepo;
    protected ProductService $productService;

    public function __construct(CartRepository $cartRepo, ProductService $productService)
    {
        $this->cartRepo = $cartRepo;
        $this->productService = $productService;
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
            $this->cartRepo->updateCart($cart->id, ['quantity' => $cart->quantity + $quantity]);
        } else {
            $this->cartRepo->addToCart($userId, $productId, $quantity);
        }
        $this->productService->decrementStock($productId, $quantity);
        return $this->cartRepo->getCartByUserId($userId);
    }

    public function updateCart($id, $quantity)
    {
        $cart = $this->cartRepo->find($id);
        $this->productService->checkStock($cart->product_id, $quantity);
        $this->cartRepo->updateCart($cart->id, ['quantity' => $quantity]);
        $this->productService->decrementStock($cart->product_id, $quantity - $cart->quantity);
        return $this->getCartByUserId($cart->user_id);
    }

    public function removeFromCart($id)
    {
        $cart = $this->cartRepo->find($id);
        $this->productService->incrementStock($cart->product_id, $cart->quantity);
        $this->cartRepo->removeFromCart($id);
        return $this->getCartByUserId($cart->user_id);
    }
}
