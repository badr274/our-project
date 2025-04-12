<?php

namespace App\Services\Product;

use App\Repositories\ProductRepository;

class ProductService
{
    protected ProductRepository $productRepo;

    public function __construct(ProductRepository $productRepo)
    {
        $this->productRepo = $productRepo;
    }

    public function getAll($limit = null)
    {
        return $this->productRepo->getLatest($limit);
    }

    public function getWithSimilar($id)
    {
        $product = $this->productRepo->find($id);
        $similar = $this->productRepo->getSimilarByCategory($product->category_id, $id);
        return [
            'product' => $product,
            'SimilarProducts' => $similar
        ];
    }
}
