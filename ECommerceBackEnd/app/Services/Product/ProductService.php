<?php

namespace App\Services\Product;

use App\Repositories\ProductRepository;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Traits\HasImage;

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
        $data['image'] = $this->handleImageUpload($request, 'products');

        return $this->productRepo->create($data);
    }

    public function updateProduct(Product $product, array $data, Request $request)
    {
        $newImage = $this->handleImageUpload($request, 'products', $product->image);
        if ($newImage) {
            $data['image'] = $newImage;
        }
        return $this->productRepo->update($product, $data);
    }

    public function deleteProduct(Product $product)
    {
        $this->deleteImage($product->image);
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
