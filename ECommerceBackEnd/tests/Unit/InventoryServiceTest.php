<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Services\Product\InventoryService;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Category;

class InventoryServiceTest extends TestCase
{
    use RefreshDatabase;

    protected $inventoryService;

    public function setUp(): void
    {
        parent::setUp();

        $this->inventoryService = new InventoryService(new \App\Repositories\ProductRepository());
    }


    public function testCheckStock()
    {
        $category = Category::factory()->create();
        $product = Product::create([
            'title' => 'Test Product',
            'stock' => 10,
            'price' => 100,
            'category_id' => $category->id
        ]);

        $quantity = 5;

        $this->inventoryService->checkStock($product->id, $quantity);

        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Not enough stock');
        $this->inventoryService->checkStock($product->id, 20);
    }

    public function testDecrementStock()
    {
        $category = Category::factory()->create();
        $product = Product::create([
            'title' => 'Test Product',
            'stock' => 10,
            'price' => 100,
            'category_id' => $category->id
        ]);

        $quantity = 5;

        $this->inventoryService->decrementStock($product->id, $quantity);

        $product->refresh();
        $this->assertEquals(5, $product->stock);
    }

    public function testIncrementStock()
    {
        $category = Category::factory()->create();
        $product = Product::create([
            'title' => 'Test Product',
            'stock' => 10,
            'price' => 100,
            'category_id' => $category->id
        ]);

        $quantity = 5;

        $this->inventoryService->incrementStock($product->id, $quantity);

        $product->refresh();
        $this->assertEquals(15, $product->stock);
    }
}
