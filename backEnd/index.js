import express from "express";
import cors from "cors";
import { router } from "./routes/routes.js";

const PORT = 4000;
const app = express();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5177", // Si por algo falla por politicas de CORS, modifica esta URI para que reconozca el servidor local de react.
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT);

console.log("Server on: " + PORT);
