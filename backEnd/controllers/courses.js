import { pool } from "../routes/routes.js";
import { v4 } from "uuid";

// Obtiene todos los cursos (Administrador)
export const getCourses = async (req, res) => {
  try {
    const [response] = await pool.query("SELECT * FROM courses");

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
};

// Obtiene todos los cursos activos (Cliente)
export const getActiveCourses = async (req, res) => {
  try {
    const [response] = await pool.query("SELECT * FROM courses WHERE status = 1");

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
};

// Obtiene la información de los usuarios de un curso especifico
export const getCourseUsersInfo = async (req, res) => {
  try {
    const { UUID } = req.params;
    const [response] = await pool.query("SELECT * FROM reservations WHERE course_id = ?", [UUID]);
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
};

// Crea un nuevo curso
export const setCourse = async (req, res) => {
  try {
    const { name, date, location, slots, price, status } = req.body;

    if (!name || !date || !location || slots === undefined || price === undefined) {
      return res.status(400).json({
        message: "Todos los campos obligatorios deben estar presentes: name, date, location, slots, price.",
      });
    }

    if (typeof slots !== "number" || slots < 0) {
      return res.status(400).json({
        message: "El campo 'slots' debe ser un número mayor o igual a 0.",
      });
    }

    if (typeof price !== "number" || price < 0) {
      return res.status(400).json({
        message: "El campo 'price' debe ser un número mayor o igual a 0.",
      });
    }

    await pool.query("INSERT INTO courses (name, date, location, slots, price_slot, status) VALUES (?, ?, ?, ?, ?, ?);", [
      name,
      date,
      location,
      slots,
      price,
      status ?? true,
    ]);

    return res.status(200).json({
      message: "Curso creado correctamente.",
    });
  } catch (error) {
    const message = "Error al intentar crear un curso: " + error;
    console.log(message);
    res.status(500).json({
      message: message,
    });
  }
};

// Actualiza los datos del curso
export const updateCourse = async (req, res) => {
  try {
    const { UUID } = req.params;
    const { name, date, location, slots, price, status } = req.body;

    if (!UUID || !name || !date || !location || slots === undefined || price === undefined) {
      return res.status(400).json({
        message: "Todos los campos obligatorios deben estar presentes: name, date, location, slots, price.",
      });
    }

    if (typeof slots !== "number" || slots < 0) {
      return res.status(400).json({
        message: "El campo 'slots' debe ser un número mayor o igual a 0.",
      });
    }

    if (typeof price !== "number" || price < 0) {
      return res.status(400).json({
        message: "El campo 'price' debe ser un número mayor o igual a 0.",
      });
    }

    await pool.query("UPDATE courses SET name = ?, date = ?, location = ?, slots = ?, price_slot = ?, status = ? WHERE id = ?;", [
      name,
      date,
      location,
      slots,
      price,
      status ?? true,
      UUID,
    ]);

    return res.status(200).json({
      message: "Curso actualizado correctamente.",
    });
  } catch (error) {
    const message = "Error al intentar actualizar el curso: " + error;
    console.log(message);
    res.status(500).json({
      message: message,
    });
  }
};

// Elimina un curso
export const deleteCourse = async (req, res) => {
  try {
    const { UUID } = req.params;

    await pool.query("DELETE FROM reservations WHERE course_id = ?;", [UUID]);

    const [result] = await pool.query("DELETE FROM courses WHERE id = ?;", [UUID]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Curso no encontrado." });
    }

    return res.status(200).json({
      message: "Curso eliminado correctamente",
    });
  } catch (error) {
    const message = "Error al intentar eliminar el curso: " + error;
    console.log(message);
    res.status(500).json({
      message: message,
    });
  }
};

// Obtiene los datos de un curso especifico
export const getCourseInfo = async (UUID) => {
  try {
    const [response] = await pool.query("SELECT * FROM courses WHERE id = ?", [UUID]);
    return response;
  } catch (error) {
    console.log("Error al intentar obtener los datos del curso: " + error);
  }
};

// Agrega una reservación
export const addClient = async (UUID, name, lastname) => {
  try {
    if (!UUID || !name || !lastname) {
      throw new Error("Todos los campos obligatorios deben estar presentes");
    }

    const [courseRows] = await pool.query("SELECT * FROM courses WHERE id = ?;", [UUID]);

    if (courseRows.length === 0) {
      throw new Error("Curso no encontrado");
    }

    const userUUID = v4();
    await pool.query("INSERT INTO reservations (id, client_name, client_lastname, course_id) VALUES (?, ?, ?, ?);", [userUUID, name, lastname, UUID]);

    return userUUID;
  } catch (error) {
    throw new Error("Error al intentar agregar cliente: " + error);
  }
};

export const confirmClient = async (UUID, payment_ID) => {
  try {
    if (!UUID || !payment_ID) {
      throw new Error("Faltan datos");
    }

    await pool.query("UPDATE reservations SET payment_ID = ?, date = NOW() WHERE id = ?", [payment_ID, UUID]);
  } catch (error) {
    throw new Error("Error al intentar confirmar cliente: " + error.message);
  }
};

export const getClientInfo = async (UUID) => {
  try {
    if (!UUID) {
      throw new Error("Faltan datos");
    }

    const [response] = await pool.query("SELECT * FROM reservations WHERE id = ?", [UUID]);
    return response;
  } catch (error) {
    throw new Error("Error al intentar confirmar cliente: " + error.message);
  }
};
