-- 1️⃣ Drop database if it already exists (Prevents errors)
DROP DATABASE IF EXISTS YogaStudioDB;

-- 2️⃣ Create the database
CREATE DATABASE YogaStudioDB;
USE YogaStudioDB;

-- 3️⃣ Create the Teachers table (must be created first)
CREATE TABLE Teachers (
    teacher_id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_name VARCHAR(100) NOT NULL,
    experience INT
) ENGINE=InnoDB;

-- 4️⃣ Create the Classes table (references Teachers)
CREATE TABLE Classes (
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(100) NOT NULL,
    description TEXT,
    instructor_id INT,
    schedule DATETIME,
    duration INT,
    FOREIGN KEY (instructor_id) REFERENCES Teachers(teacher_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5️⃣ Create the Users table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    age INT,
    weight DECIMAL(5,2),
    health_condition TEXT
) ENGINE=InnoDB;

-- 6️⃣ Create the Diet Plans table
CREATE TABLE DietPlans (
    diet_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    plan_details TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 7️⃣ Create the Yoga Programs table
CREATE TABLE YogaPrograms (
    program_id INT AUTO_INCREMENT PRIMARY KEY,
    program_name VARCHAR(100) NOT NULL,
    description TEXT
) ENGINE=InnoDB;

-- 8️⃣ Create the Enrollments table (Tracks user enrollments in classes)
CREATE TABLE Enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    class_id INT,
    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES Classes(class_id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 9️⃣ Sample Data Insertion
INSERT INTO Teachers (teacher_name, experience) VALUES 
('John Doe', 10),
('Emily Smith', 8);

INSERT INTO Classes (class_name, description, instructor_id, schedule, duration) VALUES 
('Yoga Basics', 'A beginner-friendly yoga class.', 1, '2024-03-20 08:00:00', 60),
('Advanced Meditation', 'Deep meditation techniques.', 2, '2024-03-21 18:00:00', 45);

INSERT INTO Users (full_name, email, password, age, weight, health_condition) VALUES 
('Alice Johnson', 'alice@example.com', 'password123', 30, 65.5, 'None'),
('Bob Brown', 'bob@example.com', 'securepass', 40, 80.0, 'Diabetes');

INSERT INTO DietPlans (user_id, plan_details) VALUES 
(1, 'Low-carb, high-protein diet'),
(2, 'Diabetic-friendly meal plan');

INSERT INTO YogaPrograms (program_name, description) VALUES 
('Weight Loss Yoga', 'A program focused on weight loss.'),
('Stress Relief Yoga', 'A calming yoga program.');

INSERT INTO Enrollments (user_id, class_id) VALUES 
(1, 1), 
(2, 2);
