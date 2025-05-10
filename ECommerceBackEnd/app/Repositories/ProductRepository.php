<?php

namespace App\Repositories;

use App\Models\Product;

class ProductRepository
{
    public function getLatest($limit = null)
    {
        $query = Product::latest();

        if ($limit) {
            $query->limit($limit);
        }

        return $query->get();
    }


    public function find($id)
    {
        return Product::findOrFail($id);
    }

    public function getSimilarByCategory($categoryId, $excludeProductId)
    {
        return Product::where('category_id', $categoryId)
            ->where('id', '!=', $excludeProductId)
            ->limit(5)
            ->get();
    }

    public function decrementStock($productId, $quantity)
    {
        Product::where('id', $productId)->decrement('stock', $quantity);
    }

    public function incrementStock($productId, $quantity)
    {
        Product::where('id', $productId)->increment('stock', $quantity);
    }

    public function create($data)
    {
        return Product::create($data);
    }

    public function update($product, $data)
    {
        $product->update($data);
        return $product;
    }

    public function delete($product)
    {
        return $product->delete();
    }
}
