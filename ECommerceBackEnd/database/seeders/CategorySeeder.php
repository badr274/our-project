<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Facades\File;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get(database_path('data/categories.json'));
        $categories = json_decode($json, true);

        foreach ($categories as $categoryData) {
            Category::create($categoryData);
        }
    }
}
