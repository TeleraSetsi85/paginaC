import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

export const PORT = process.env.PORT;
export const URI = "http://localhost:" + PORT;
export const ORIGIN = process.env.ORIGIN;
export const SECRET = process.env.SECRET;

export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_DATABASE;
export const DB_PORT = process.env.DB_PORT;

export const ADMIN_USER = process.env.USER;
export const ADMIN_PASSWORD = process.env.PASSWORD;

export const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET;
export const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT;
export const PAYPAL_API = process.env.PAYPAL_API;
