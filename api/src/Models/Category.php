<?php
namespace Models;

class Category
{
    public static function getAll($pdo)
    {
        $stmt = $pdo->query('SELECT * FROM categories');
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public static function getById($pdo, $id)
    {
        $stmt = $pdo->prepare('SELECT * FROM categories WHERE id = :id');
        $stmt->execute(['id' => $id]);
        return $stmt->fetch(\PDO::FETCH_ASSOC);
    }
}
