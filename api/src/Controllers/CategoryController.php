<?php
namespace Controllers;
use Models\Category;

class CategoryController
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function getAllCategories()
    {
        $categories = Category::getAll($this->pdo);
        header('Content-Type: application/json');
        echo json_encode($categories);
    }

    public function getCategoryById($id)
    {
        $category = Category::getById($this->pdo, $id);
        if ($category) {
            header('Content-Type: application/json');
            echo json_encode($category);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Category not found']);
        }
    }
}
