<?php

namespace App\Http\Controllers\Api\Web\Payment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use App\Services\Payment\PaymentService;
use App\Http\Requests\Api\Web\Payment\PaymentRequest;

class PaymentController extends Controller
{
    protected PaymentService $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }


    public function createPaymentIntent(PaymentRequest $request)
    {
        $data = $this->paymentService->createPaymentIntent($request->validated());

        return response()->json($data);
    }
}
