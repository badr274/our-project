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
    protected $quantity;

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
        $this->quantity = 5;
    }


    public function testCheckStock()
    {
        $this->inventoryService->checkStock($this->product->id, $this->quantity);

        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Not enough stock');
        $this->inventoryService->checkStock($this->product->id, 20);
    }

    public function testDecrementStock()
    {
        $this->inventoryService->decrementStock($this->product->id, $this->quantity);

        $this->product->refresh();
        $this->assertEquals($this->product->stock - $this->quantity, $this->product->stock);
    }

    public function testIncrementStock()
    {
        $this->inventoryService->incrementStock($this->product->id, $this->quantity);

        $this->product->refresh();
        $this->assertEquals($this->product->stock + $this->quantity, $this->product->stock);
    }
}
