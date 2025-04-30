<?php

namespace App\Http\Controllers\API\Cart;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\Cart\CartRequest;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use App\Services\Cart\CartService;

class CartController extends Controller
{

    protected CartService $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    public function index(): JsonResponse
    {
        $carts = $this->cartService->getCartByUserId(auth()->id());
        return response()->json(['carts' => $carts], 200);
    }


    public function store(CartRequest $request): JsonResponse
    {
        $cart = $this->cartService->addToCart(auth()->id(), $request->product_id, $request->quantity);
        return response()->json([
            'message' => 'Product added to cart successfully',
            'cart' => $cart
        ], 201);
    }


    public function update(CartRequest $request, Cart $cart): JsonResponse
    {
        $cart = $this->cartService->updateCart($cart->id, $request->quantity);
        return response()->json([
            'message' => 'Product quantity updated successfully',
            'cart' => $cart
        ], 200);
    }


    public function destroy(Cart $cart): JsonResponse
    {
        $cart = $this->cartService->removeFromCart($cart->id);
        return response()->json([
            'message' => 'Product removed from cart successfully',
            'cart' => $cart
        ], 200);
    }
}
