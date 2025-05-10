<?php

namespace App\Http\Controllers\Api\Admin\Product;

use App\Http\Controllers\Controller;
use App\Http\Requests\API\Admin\Product\ProductRequest;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use App\Services\Product\ProductService;

class ProductController extends Controller
{

    protected ProductService $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }


    public function index()
    {
        $products = $this->productService->getAll();
        return response()->json(['products' => $products]);
    }


    public function store(ProductRequest $request)
    {
        $product = $this->productService->createProduct($request, $request->validated());
        return response()->json(['product' => $product], 201);
    }


    public function show(Product $product)
    {
        return response()->json(['product' => $product]);
    }


    public function update(ProductRequest $request, Product $product)
    {
        $product = $this->productService->updateProduct($product, $request->validated(), $request);
        return response()->json(['product' => $product]);
    }


    public function destroy(Product $product)
    {
        $this->productService->deleteProduct($product);
        return response()->json(['message' => 'Product deleted successfully']);
    }
}
