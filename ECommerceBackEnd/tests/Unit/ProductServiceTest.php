<?php

namespace Tests\Unit;

use App\Models\Product;
use App\Repositories\ProductRepository;
use App\Services\Product\ProductService;
use Mockery;
use Tests\TestCase;

class ProductServiceTest extends TestCase
{
    public function test_check_stock_throws_exception_when_not_enough()
    {
        $mockRepo = Mockery::mock(ProductRepository::class);
        $mockRepo->shouldReceive('find')->with(1)->andReturn((object)['stock' => 2]);

        $service = new ProductService($mockRepo);

        $this->expectException(\Exception::class);
        $this->expectExceptionMessage('Not enough stock');

        $service->checkStock(1, 5);
    }
}
