<?php

namespace App\Services\Payment;

use Stripe\Stripe;
use Stripe\PaymentIntent;

class PaymentService
{
    const DEFAULT_CURRENCY = 'usd';
    const SUPPORTED_METHODS = ['card'];

    public function createPaymentIntent(array $data)
    {
        try {
            $this->initializeStripe();

            $paymentIntent = PaymentIntent::create(
                $this->buildPaymentIntentPayload($data['amount'])
            );

            return [
                'clientSecret' => $paymentIntent->client_secret,
                'user' => auth()->user(), // يمكن جعله اختياريًا
            ];
        } catch (\Exception $e) {
            return [
                'error' => $e->getMessage(),
            ];
        }
    }

    private function initializeStripe(): void
    {
        Stripe::setApiKey(env('STRIPE_SECRET_KEY'));
    }

    private function buildPaymentIntentPayload(float $amount): array
    {
        return [
            'amount' => intval($amount * 100),
            'currency' => self::DEFAULT_CURRENCY,
            'payment_method_types' => self::SUPPORTED_METHODS,
        ];
    }
}
