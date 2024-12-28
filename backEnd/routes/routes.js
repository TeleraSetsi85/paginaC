import { Router } from "express";
import dotenv from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createPool } from "mysql2/promise";

// Configuración de las variables de entorno
dotenv.config({
  path: join(dirname(dirname(fileURLToPath(import.meta.url))), ".env"),
});

export const router = Router();
const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Login
router.post("/admin", (req, res) => {
  try {
    const { username, password } = req.body;

    if (username === process.env.USER && password === process.env.PASSWORD) {
      req.session.user = { username };
      return res.status(200).json({
        message: "Sesión iniciada correctamente",
      });
    } else {
      return res.status(401).json({
        message: "Error al intentar iniciar sesión: Credenciales incorrectas",
      });
    }
  } catch (error) {
    const message = "Error al intentar iniciar sesión: " + error;
    console.log(message);
    res.status(500).json({
      message: message,
    });
  }
});

// Verifica la sesión
function checkAuth(req, res, next) {
  if (!req.session.user) {
    return res.status(403).json({
      message: "Acceso bloqueado: Sesión no iniciada",
    });
  }
  next();
}

// Logout
router.post("/admin/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      const message = "Error al intentar cerrar sesión: " + err;
      console.log(message);
      res.status(500).json({
        message: message,
      });
    }

    res.status(200).json({
      message: "Sesión cerrada correctamente",
    });
  });
});

// Obtener todos los cursos de la DB
router.get("/admin/courses", checkAuth, async (req, res) => {
  try {
    const [response] = await pool.query("Select * from courses where status = 1");

    res.status(200).json({
      message: "Exito",
      body: response,
    });
  } catch (error) {
    const message = "Error al intentar obtener los cursos: " + error;
    console.log(message);
    res.status(500).json({
      message: message,
    });
  }
});

// Obtener la información de las reservaciones de cada curso
router.get("/admin/courses/:UUID", checkAuth, async (req, res) => {
  try {
    const { UUID } = req.params;
    const [response] = await pool.query(`Select * from reservations where course_id = ?`, [UUID]);
    res.status(200).json({
      message: "Exito",
      body: response,
    });
  } catch (error) {
    const message = "Error al intentar obtener las reservaciones del curso: " + error;
    console.log(message);
    res.status(500).json({
      message: message,
    });
  }
});

// Crear un nuevo curso
// Modificar un curso
// Eliminar un curso
// Comprar un boleto
