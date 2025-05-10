<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\Web\Auth\AuthController;
use App\Http\Controllers\API\Web\Home\HomeController;
use App\Http\Controllers\API\Web\Product\ProductController;
use App\Http\Controllers\API\Web\Cart\CartController;
use App\Http\Controllers\API\Web\Wishlist\WishlistController;
use App\Http\Controllers\API\Web\Payment\PaymentController;
use App\Http\Controllers\API\Web\Order\OrderController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{product}', [ProductController::class, 'show']);

Route::get('/latest-products', HomeController::class);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::put('/cart/{cart}', [CartController::class, 'update']);
    Route::delete('/cart/{cart}', [CartController::class, 'destroy']);
    Route::post('/wishlist', [WishlistController::class, 'store']);
    Route::delete('/wishlist/{wishlist}', [WishlistController::class, 'destroy']);
    Route::get('/wishlist', [WishlistController::class, 'index']);
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/create-payment-intent', [PaymentController::class, 'createPaymentIntent']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{order}', [OrderController::class, 'show']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::put('/orders/{order}', [OrderController::class, 'update_status']);
});
