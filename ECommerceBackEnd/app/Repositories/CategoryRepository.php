<?php

namespace App\Repositories;

use App\Models\Category;

class CategoryRepository
{
    public function getAllCategories()
    {
        return Category::all();
    }

    public function createCategory($data)
    {
        return Category::create($data);
    }

    public function updateCategory($category, $data)
    {
        return Category::where('id', $category->id)->update($data);
    }

    public function deleteCategory($category)
    {
        return Category::where('id', $category->id)->delete();
    }
}
