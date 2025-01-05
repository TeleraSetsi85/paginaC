import axios from "axios";
import Swal from "sweetalert2";

const apiAxios = axios.create({
  baseURL: "http://localhost:4000",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiAxios.interceptors.response.use(
  (response) => {
    const { message } = response.data;

    if (message === "Acceso bloqueado: Sesión no iniciada") {
      Swal.fire({
        icon: "error",
        title: "Acceso denegado",
        text: "Por favor, inicie sesión.",
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) window.location.href = "/auth";
      });
    }

    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      Swal.fire({
        icon: "error",
        title: "Credenciales incorrectas",
        text: "Intente nuevamente.",
        confirmButtonText: "Aceptar",
      });
    }

    if (error.code === "ECONNABORTED") {
      Swal.fire({
        icon: "warning",
        title: "Tiempo de espera agotado",
        text: "El servidor tomó demasiado tiempo en responder. Si el problema persiste, comuníquese con el administrador.",
        confirmButtonText: "Aceptar",
      });
    }

    if (error.response?.status === 403) {
      Swal.fire({
        icon: "error",
        title: "Acceso denegado",
        text: "Sesión no válida o expirada.",
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) window.location.href = "/auth";
      });
    }

    return Promise.reject(error);
  }
);

export default apiAxios;
