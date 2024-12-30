-- Crea la base de datos si no existe
CREATE DATABASE IF NOT EXISTS LSCourses;

-- Usa la db
USE LSCourses;

-- Crea la tabla de Cursos
CREATE TABLE IF NOT EXISTS Courses (
    id CHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    slots INT NOT NULL CHECK (slots >= 0),
    price_slot DECIMAL(10, 2) NOT NULL CHECK (price_slot >= 0) DEFAULT 0.00,
    status BOOLEAN NOT NULL DEFAULT TRUE
);

-- Crea una tabla donde se guardaran las reservaciones
CREATE TABLE IF NOT EXISTS Reservations (
    id CHAR(36) PRIMARY KEY NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    client_lastname VARCHAR(255) NOT NULL,
    date DATETIME,
    payment_ID VARCHAR(64),
    course_id CHAR(36) NOT NULL,
    FOREIGN KEY (course_id) REFERENCES Courses(id) ON DELETE CASCADE
);
