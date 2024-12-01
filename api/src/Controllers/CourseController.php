<?php
namespace Controllers;

use Models\Course;

class CourseController
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function getAllCourses()
    {
        $categoryId = $_GET['category_id'] ?? null;
        $courses = Course::getAll($this->pdo, $categoryId);
        header('Content-Type: application/json');
        echo json_encode($courses);
    }

    public function getCourseById($id)
    {
        $course = Course::getById($this->pdo, $id);
        if ($course) {
            header('Content-Type: application/json');
            echo json_encode($course);
        } else {
            http_response_code(404);
            echo json_encode(['message' => 'Course not found']);
        }
    }
}
