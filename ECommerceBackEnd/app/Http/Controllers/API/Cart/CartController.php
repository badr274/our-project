<?php

namespace App\Http\Controllers\API\Cart;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\Cart\CartRequest;
use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\JsonResponse;

class CartController extends Controller
{
    public function store(CartRequest $request): JsonResponse
    {
        $data = $request->validated();
        $data['user_id'] = auth()->user()->id;

        $product = Product::find($data['product_id']);

        if ($data['quantity'] > $product->stock) {
            return response()->json(['error' => 'Insufficient stock'], 400);
        }

        $cart = Cart::where('product_id', $data['product_id'])
            ->where('user_id', $data['user_id'])
            ->first();

        if ($cart) {
            $cart->increment('quantity', $data['quantity']);
        } else {
            $cart = Cart::create($data);
        }

        $product->decrement('stock', $data['quantity']);

        $cart = Cart::with(['product:id,title,price,discount,image'])->where('user_id', $data['user_id'])->get();

        return response()->json([
            'message' => 'Product added to cart successfully',
            'cart' => $cart
        ], 201);
    }


    public function destroy(Cart $cart): JsonResponse
    {
        $product = Product::find($cart->product_id);
        $product->increment('stock', $cart->quantity);

        $cart->delete();

        return response()->json([
            'message' => 'Product removed from cart successfully'
        ], 200);
    }

    public function index(): JsonResponse
    {
        $carts = Cart::with(['product:id,title,price,discount,image'])
        ->where('user_id', auth()->id())
        ->get();
        return response()->json(['carts' => $carts], 200);
    }
}

