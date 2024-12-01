<?php
spl_autoload_register(function ($class) {
    $baseDir = __DIR__ . '/';
    $file = $baseDir . str_replace('\\', '/', $class) . '.php';

    if (file_exists($file)) {
        require $file;
    } else {
        error_log("Autoloader: Cannot load class $class. Expected file $file");
    }
});

try {
  $pdo = new PDO(
        'mysql:host=db;port=3306;dbname=course_catalog;charset=utf8mb4',
        'test_user',
        'test_password'
    );
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo $e;
    echo json_encode(['message' => 'Database connection failed']);
    exit;
}
