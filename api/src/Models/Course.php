<?php
namespace Models;

class Course
{
    public static function getAll($pdo, $categoryId = null)
    {
        if ($categoryId) {
            // Fetch courses in the specified category
            $stmt = $pdo->prepare('SELECT * FROM courses JOIN categories ON courses.category_id = categories.id WHERE category_id = :category_id');
            $stmt->execute(['category_id' => $categoryId]);
        } else {
            $stmt = $pdo->query('SELECT * FROM courses JOIN categories ON courses.category_id = categories.id');
        }
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public static function getById($pdo, $id)
    {
        $stmt = $pdo->prepare('SELECT * FROM courses WHERE course_id = :id');
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
}
