import apiAxios from "./axios.js";

// Autenticación
export const auth = async (form) => await apiAxios.post("/auth", form);
export const logOut = async () => await apiAxios.get("/admin/logout");

// Administrador
export const getCourses = async () => await apiAxios.get("/admin/courses");
export const addCourse = async (form) => await apiAxios.post("/admin/courses", form);
export const updateCourse = async (UUID, form) => apiAxios.put(`/admin/courses/${UUID}`, form);
export const deleteCourse = async (UUID) => apiAxios.delete(`/admin/courses/${UUID}`);
export const getUsersInfo = async (UUID) => apiAxios.get(`/admin/courses/${UUID}`);

// Cliente
export const getActiveCourses = async () => await apiAxios.get("/courses");
export const createOrder = async (UUID, form) => await apiAxios.post(`/payment/create-order/${UUID}`, form);
