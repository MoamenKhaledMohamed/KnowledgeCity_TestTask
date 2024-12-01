-- up
CREATE TABLE `courses` (
    `course_id` VARCHAR(255),
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `image_preview` VARCHAR(255),
    `category_id` VARCHAR(255),
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`course_id`),
    FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE SET NULL
);

INSERT INTO `courses` (`course_id`, `title`, `description`, `image_preview`, `category_id`)
VALUES 
('L373349028', 'Diversity and Inclusion for a Better Business', 'Diversity can seem like a difficult concept...', 'https://cdn0.knowledgecity.com/opencontent/courses/previews/L373349028/800--v112240.jpg', '3d4e5f6a-7b8c-9d0e-1f2a-3b4c5d6e7f8a'),
('L373371072', 'Leadership for Identity Diversity', 'As a leader, people of many different backgrounds...', 'https://cdn0.knowledgecity.com/opencontent/courses/previews/L373371072/800--v112239.jpg', '3d4e5f6a-7b8c-9d0e-1f2a-3b4c5d6e7f8a'),
('L373324314', 'Mentoring the Workforce of Tomorrow', 'A mentor is a teacher and guide...', 'https://cdn0.knowledgecity.com/opencontent/courses/previews/L373324314/800--v112238.jpg', '3d4e5f6a-7b8c-9d0e-1f2a-3b4c5d6e7f8a'),
('L373371067', 'Influential Leadership for Change', 'Being a leader of change is often about inspiring others...', 'https://cdn0.knowledgecity.com/opencontent/courses/previews/L373371067/800--v112237.jpg', '3d4e5f6a-7b8c-9d0e-1f2a-3b4c5d6e7f8a');

-- down
DROP TABLE `courses`;
