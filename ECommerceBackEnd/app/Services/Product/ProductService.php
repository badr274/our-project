<?php

namespace App\Services\Product;

use App\Repositories\ProductRepository;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Traits\HasImage;
use App\DTOs\ProductData;

class ProductService extends InventoryService
{
    use HasImage;

    protected ProductRepository $productRepo;

    public function __construct(ProductRepository $productRepo)
    {
        $this->productRepo = $productRepo;
    }

    public function getAll($limit = null)
    {
        return $this->productRepo->getLatest($limit);
    }

    public function createProduct(Request $request, array $data)
    {
        $productData = ProductData::fromRequest($data);
        $productData->image = $this->handleImageUpload($request, 'products');

        return $this->productRepo->create($productData->toArray());
    }

    public function updateProduct(Product $product, array $data, Request $request)
    {
        $productData = ProductData::fromRequest($data);
        $newImage = $this->handleImageUpload($request, 'products', $product->image);

        if ($newImage) {
            $productData->image = $newImage;
        }

        return $this->productRepo->update($product, $productData->toArray());
    }

    public function deleteProduct(Product $product)
    {
        $this->deleteImage($product->image, 'products');
        $this->productRepo->delete($product);
    }

    public function getWithSimilar($id)
    {
        $product = $this->productRepo->find($id);
        $similar = $this->productRepo->getSimilarByCategory($product->category_id, $id);

        return [
            'product' => $product,
            'similarProducts' => $similar
        ];
    }
}
