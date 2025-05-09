<?php

namespace App\Http\Controllers\Api\Order;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Order\StoreOrderRequest;
use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Http\JsonResponse;
use App\Models\Cart;
use App\Services\Order\OrderService;

class OrderController extends Controller
{
    protected OrderService $orderService;
    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $orders = $this->orderService->getOrders(auth()->user()->id);
        return response()->json(['order' => $orders], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrderRequest $request): JsonResponse
    {
        $orders = $this->orderService->createOrder($request->validated());
        return response()->json(['order' => $orders, 'cart' => []], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order): JsonResponse
    {
        $order = $this->orderService->getOrder($order->id);
        return response()->json(['order' => $order], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update_status(Request $request, Order $order)
    {
        $order->status = "cancelled";
        $order->save();
        return response()->json(['message' => 'Order status updated successfully'], 200);
    }
}
