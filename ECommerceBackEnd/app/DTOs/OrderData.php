<?php

namespace App\DTOs;

use DateTime;
use App\Enums\OrderStatus;
use App\DTOs\AddressData;
use App\ValueObjects\OrderTotals;
use App\Services\ShippingCalculator;

class OrderData
{
    public function __construct(
        public readonly int $userId,
        public readonly array $items,
        public readonly AddressData $shippingAddress,
        public readonly OrderStatus $status = OrderStatus::PENDING,
        public readonly ?DateTime $createdAt = null
    ) {
        $this->createdAt = $createdAt ?? new DateTime();
    }

    public function calculateTotals(): OrderTotals
    {
        $subtotal = array_reduce($this->items, fn($sum, $item) => 
            $sum + ($item->price * $item->quantity), 0);
        
        return new OrderTotals(
            subtotal: $subtotal,
            tax: $subtotal * 0.1,
            shipping: ShippingCalculator::calculate($this->shippingAddress),
            total: $subtotal + ($subtotal * 0.1) + ShippingCalculator::calculate($this->shippingAddress)
        );
    }

    public function toArray(): array
    {
        $totals = $this->calculateTotals();
        return [
            'user_id' => $this->userId,
            'items' => $this->items,
            'shipping_address' => $this->shippingAddress->toArray(),
            'status' => $this->status->value,
            'created_at' => $this->createdAt->format('Y-m-d H:i:s'),
            'subtotal' => $totals->subtotal,
            'tax' => $totals->tax,
            'shipping' => $totals->shipping,
            'total' => $totals->total
        ];
    }
} 