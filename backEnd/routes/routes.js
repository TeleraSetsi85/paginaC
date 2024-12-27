import { Router } from "express";
import { createPool } from "mysql2/promise";

export const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Conexión correcta con el servidor",
  });
});
