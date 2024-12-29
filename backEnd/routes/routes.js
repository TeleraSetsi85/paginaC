import { Router } from "express";

import { fileURLToPath } from "url";
import { createPool } from "mysql2/promise";
import { login, logOut, checkAuth } from "../controllers/auth.js";
import { deleteCourse, getActiveCourses, getCourses, getCourseUsersInfo, setCourse, updateCourse } from "../controllers/courses.js";
import { captureOrder, createOrder } from "../controllers/payment.js";
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from "../config.js";

export const router = Router();
export const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

/* Administrador */

// Inicia sesión
router.post("/admin", login);

// Cierra sesión
router.post("/admin/logout", logOut);

// Obtener todos los cursos de la DB
router.get("/admin/courses", checkAuth, getCourses);

// Obtener la información de las reservaciones de cada curso
router.get("/admin/courses/:UUID", checkAuth, getCourseUsersInfo);

// Crear un nuevo curso
router.post("/admin/courses", checkAuth, setCourse);

// Modificar un curso
router.put("/admin/courses/:UUID", checkAuth, updateCourse);

// Eliminar un curso
router.delete("/admin/courses/:UUID", checkAuth, deleteCourse);

/* Cliente */

// Obtener todos los cursos activos de la DB
router.get("/courses", getActiveCourses);

router.post("/payment/create-order", createOrder);
router.get("/payment/capture-order", captureOrder);
router.get("/payment/cancel-Payment", (req, res) => res.send("Orden cancelada"));
