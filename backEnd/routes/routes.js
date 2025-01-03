import { Router } from "express";

import { createPool } from "mysql2/promise";
import { login, logOut, checkAuth } from "../controllers/auth.js";
import { deleteCourse, getActiveCourses, getCourses, getCourseUsersInfo, setCourse, updateCourse } from "../controllers/courses.js";
import { cancelOrder, captureOrder, checkTicket, createOrder } from "../controllers/payment.js";
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
router.post("/auth", login);

// Cierra sesión
router.get("/admin/logout", checkAuth, logOut);

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

// Permite verificar el boleto de un usuario y determina si es real o no
router.get("/checkUser/:UUID", checkTicket);

// Crea la orden de pago en la API de PAYPAL
router.post("/payment/create-order/:UUID", createOrder);

// Confirma la orden de pago en la API de PAYPAL
router.get("/payment/capture-order", captureOrder);

// Cancela la orden de pago en la API de PAYPAL
router.get("/payment/cancel-Payment", cancelOrder);
