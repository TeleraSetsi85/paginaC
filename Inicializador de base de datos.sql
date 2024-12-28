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
    status BOOLEAN NOT NULL DEFAULT TRUE
);

-- Crea una tabla donde se guardaran las reservaciones
CREATE TABLE IF NOT EXISTS Reservations (
    id CHAR(36) PRIMARY KEY NOT NULL DEFAULT (UUID()),
    client_name VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    course_id CHAR(36) NOT NULL,
    FOREIGN KEY (course_id) REFERENCES Courses(id) ON DELETE CASCADE
);
