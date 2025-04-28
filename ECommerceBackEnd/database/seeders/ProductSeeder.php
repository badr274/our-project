<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use Illuminate\Support\Facades\File;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $json = File::get(database_path('data/products.json'));
        $products = json_decode($json, true);

        foreach ($products as $productData) {
            Product::create($productData);
        }
    }
}
