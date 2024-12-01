<?php
// Add headers to handle CORS
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type, Authorization"); 
require_once __DIR__ . '/src/bootstrap.php';

use Controllers\CategoryController;
use Controllers\CourseController;

$requestMethod = $_SERVER['REQUEST_METHOD'];
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$requestUri = rtrim($requestUri, '/');
// Routing
if ($requestMethod === 'GET' && $requestUri === '/categories') {
    $controller = new CategoryController($pdo);
    $controller->getAllCategories();
} elseif ($requestMethod === 'GET' && preg_match('#^/categories/([a-fA-F0-9\-]+)$#', $requestUri, $matches)) {
    $controller = new CategoryController($pdo);
    $controller->getCategoryById($matches[1]);
} elseif ($requestMethod === 'GET' && $requestUri === '/courses') {
    $controller = new CourseController($pdo);
    $controller->getAllCourses();
} elseif ($requestMethod === 'GET' && preg_match('#^/courses/([A-Z0-9]+)$#', $requestUri, $matches)) {
    $controller = new CourseController($pdo);
    $controller->getCourseById($matches[1]);
} else {
    http_response_code(404);
    echo json_encode(['message' => 'Endpoint not found']);
}
