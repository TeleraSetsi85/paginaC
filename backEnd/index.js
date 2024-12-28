import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import { router } from "./routes/routes.js";

// Configuración de las variables de entorno
dotenv.config({
  path: ".env",
});

const PORT = process.env.PORT;
const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // Si por algo falla por politicas de CORS, modifica esta URI para que reconozca el servidor local de react.
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true, // Ayuda a proteger las cookies de accesos malintencionados
      secure: false, // Cambiar a true en HTTPS
      maxAge: 1000 * 60 * 60, // Duración de la sesión: 1 hora
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT);

console.log("Server on: " + PORT);
