<?php

namespace App\Http\Controllers\API\Home;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $latestProducts = Product::latest()->limit(10)->get();
        return response()->json([
            'latestProducts' => $latestProducts
        ]);
    }
}
