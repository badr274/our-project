<?php

namespace App\Http\Controllers\API\Web\Home;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Services\Product\ProductService;


class HomeController extends Controller
{
    protected ProductService $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }
    public function __invoke(Request $request)
    {
        $latestProducts = $this->productService->getAll(10);
        return response()->json([
            'latestProducts' => $latestProducts
        ]);
    }
}
