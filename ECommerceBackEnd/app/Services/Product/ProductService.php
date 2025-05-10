<?php

namespace App\Services\Product;

use App\Repositories\ProductRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Product;

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

    public function createProduct(Request $request, array $data)
    {
        $data['image'] = $this->handleImageUpload($request);

        return $this->productRepo->create($data);
    }

    public function updateProduct(Product $product, array $data, Request $request)
    {
        $newImage = $this->handleImageUpload($request, $product->image);

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

    protected function handleImageUpload(Request $request, $oldImage = null)
    {
        if (!$request->hasFile('image')) {
            return null;
        }

        $this->deleteImage($oldImage);

        return $request->file('image')->store('products', 'public');
    }

    protected function deleteImage(?string $img)
    {
        if ($img && Storage::disk('public')->exists($img)) {
            Storage::disk('public')->delete($img);
        }
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

    public function checkStock($id, int $quantity)
    {
        $product = $this->productRepo->find($id);

        if ($product->stock < $quantity) {
            throw new \Exception('Not enough stock');
        }
    }
}
