<?php

namespace App\Http\Controllers\API\Product;

use App\Http\Controllers\Controller;
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

    public function show(string $id)
    {
        $data = $this->productService->getWithSimilar($id);
        return response()->json($data);
    }
}
