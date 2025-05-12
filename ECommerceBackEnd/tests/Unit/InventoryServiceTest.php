<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Services\Product\InventoryService;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Category;
use App\Repositories\ProductRepository;

class InventoryServiceTest extends TestCase
{
    use RefreshDatabase;

    protected $inventoryService;
    protected $product;
    protected $category;

    public function setUp(): void
    {
        parent::setUp();

        $this->inventoryService = new InventoryService(new ProductRepository());
        $this->category = Category::factory()->create();
        $this->product =  Product::create([
            'title' => 'Test Product',
            'stock' => 10,
            'price' => 100,
            'category_id' => $this->category->id
        ]);
    }


    public function testCheckStock()
    {
        $quantity = 5;

        $this->inventoryService->checkStock($this->product->id, $quantity);

        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Not enough stock');
        $this->inventoryService->checkStock($this->product->id, 20);
    }

    public function testDecrementStock()
    {
        $quantity = 5;

        $this->inventoryService->decrementStock($this->product->id, $quantity);

        $this->product->refresh();
        $this->assertEquals(5, $this->product->stock);
    }

    public function testIncrementStock()
    {
        $quantity = 5;

        $this->inventoryService->incrementStock($this->product->id, $quantity);

        $this->product->refresh();
        $this->assertEquals(15, $this->product->stock);
    }
}
