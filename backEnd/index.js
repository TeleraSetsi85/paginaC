import express from "express";
import cors from "cors";
import session from "express-session";
import { router } from "./routes/routes.js";
import { DB_DATABASE, DB_HOST, ORIGIN, PORT, SECRET } from "./config.js";

const app = express();

// Middlewares
app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
  })
);

app.use(
  session({
    secret: SECRET,
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
