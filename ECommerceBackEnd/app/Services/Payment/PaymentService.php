<?php

namespace App\Services\Payment;

use App\DTOs\PaymentData;
use App\Repositories\PaymentRepository;
use App\Exceptions\PaymentException;
use App\Factories\PaymentGatewayFactory;
use App\Models\Payment;

class PaymentService
{
    public function __construct(
        private readonly PaymentRepository $paymentRepo
    ) {}

    public function processPayment(PaymentData $paymentData): Payment
    {
        try {
            $gateway = PaymentGatewayFactory::create($paymentData->method);
            $result = $gateway->process($paymentData->amount);
            
            return $this->paymentRepo->create(
                $paymentData->withStatus(
                    $result->isSuccessful() 
                        ? PaymentStatus::COMPLETED 
                        : PaymentStatus::FAILED
                )->withTransactionId($result->getTransactionId())
                 ->withError($result->getError())
                 ->toArray()
            );
        } catch (PaymentException $e) {
            return $this->paymentRepo->create(
                $paymentData->withStatus(PaymentStatus::FAILED)
                           ->withError($e->getMessage())
                           ->toArray()
            );
        }
    }

    public function getPayment(int $id): ?Payment
    {
        return $this->paymentRepo->find($id);
    }

    public function getOrderPayments(int $orderId): array
    {
        return $this->paymentRepo->findByOrderId($orderId);
    }
} 