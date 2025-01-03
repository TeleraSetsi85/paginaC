import apiAxios from "./axios.js";

// Autenticación
export const auth = async (form) => await apiAxios.post("/auth", form);
export const logOut = async (form) => await apiAxios.get("/admin/logout", form);

// Administrador
export const getCourses = async () => await apiAxios.get("/admin/courses");
export const addCourse = async (form) => await apiAxios.post("/admin/courses", form);

// Cliente
export const getActiveCourses = async () => await apiAxios.get("/courses");
