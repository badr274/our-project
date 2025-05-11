<?php

namespace App\DTOs;

use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\ValueObjects\Money;
use Illuminate\Http\Request;

class PaymentData
{
    public function __construct(
        public readonly int $orderId,
        public readonly Money $amount,
        public readonly PaymentMethod $method,
        public readonly PaymentStatus $status = PaymentStatus::PENDING,
        public readonly ?string $transactionId = null,
        public readonly ?string $error = null
    ) {}

    public static function fromRequest(Request $request): self
    {
        return new self(
            orderId: $request->input('order_id'),
            amount: new Money(
                $request->input('amount'),
                $request->input('currency', 'USD')
            ),
            method: PaymentMethod::from($request->input('payment_method'))
        );
    }

    public function withStatus(PaymentStatus $status): self
    {
        return new self(
            orderId: $this->orderId,
            amount: $this->amount,
            method: $this->method,
            status: $status,
            transactionId: $this->transactionId,
            error: $this->error
        );
    }

    public function withTransactionId(?string $transactionId): self
    {
        return new self(
            orderId: $this->orderId,
            amount: $this->amount,
            method: $this->method,
            status: $this->status,
            transactionId: $transactionId,
            error: $this->error
        );
    }

    public function withError(?string $error): self
    {
        return new self(
            orderId: $this->orderId,
            amount: $this->amount,
            method: $this->method,
            status: $this->status,
            transactionId: $this->transactionId,
            error: $error
        );
    }

    public function toArray(): array
    {
        return [
            'order_id' => $this->orderId,
            'amount' => $this->amount->getAmount(),
            'currency' => $this->amount->getCurrency(),
            'payment_method' => $this->method->value,
            'status' => $this->status->value,
            'transaction_id' => $this->transactionId,
            'error' => $this->error
        ];
    }
} 