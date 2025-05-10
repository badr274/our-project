<?php

namespace App\Services\Category;

use App\Repositories\CategoryRepository;

class CategoryService
{
    protected CategoryRepository $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function getAllCategories()
    {
        return $this->categoryRepository->getAllCategories();
    }

    public function createCategory($data)
    {
        return $this->categoryRepository->createCategory($data);
    }

    public function updateCategory($category, $data)
    {
        return $this->categoryRepository->updateCategory($category, $data);
    }

    public function deleteCategory($category)
    {
        return $this->categoryRepository->deleteCategory($category);
    }
}
