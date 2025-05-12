<?php

namespace App\DTOs;

class ProductData
{
    public function __construct(
        public readonly string $title,
        public readonly ?string $description,
        public readonly float $price,
        public readonly ?string $image,
        public readonly int $category_id,
        public readonly int $discount = 0,
        public readonly int $stock = 0
    ) {}

    public static function fromRequest(array $data): self
    {
        return new self(
            title: $data['title'],
            description: $data['description'] ?? null,
            price: (float) $data['price'],
            image: $data['image'] ?? null,
            category_id: (int) $data['category_id'],
            discount: (int) ($data['discount'] ?? 0),
            stock: (int) ($data['stock'] ?? 0)
        );
    }

    public function toArray(): array
    {
        return [
            'title' => $this->title,
            'description' => $this->description,
            'price' => $this->price,
            'image' => $this->image,
            'category_id' => $this->category_id,
            'discount' => $this->discount,
            'stock' => $this->stock
        ];
    }
} 