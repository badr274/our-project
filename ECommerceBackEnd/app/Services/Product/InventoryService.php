<?php

namespace App\Services\Product;

use App\Models\Product;
use App\Repositories\ProductRepository;

class InventoryService
{
    protected ProductRepository $productRepo;

    public function __construct(ProductRepository $productRepo)
    {
        $this->productRepo = $productRepo;
    }

    public function checkStock($id, int $quantity)
    {
        $product = $this->productRepo->find($id);

        if ($product->stock < $quantity) {
            throw new \Exception('Not enough stock');
        }
    }

    public function decrementStock($productId, $quantity)
    {
        $product = Product::findOrFail($productId);
        $product->stock -= $quantity;
        $product->save();
    }

    public function incrementStock($productId, $quantity)
    {
        $product = Product::findOrFail($productId);
        $product->stock += $quantity;
        $product->save();
    }
}
