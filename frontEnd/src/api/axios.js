import axios from "axios";

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
      alert("Acceso denegado. Por favor, inicie sesión.");
      window.location.href = "/auth";
    }

    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      alert("Credenciales incorrectas. Intente nuevamente.");
    }

    if (error.code === "ECONNABORTED") {
      alert("El servidor tomó demasiado tiempo en responder. Si el problema persiste, comuníquese con el administrador.");
    }

    if (error.response?.status === 403) {
      alert("Acceso denegado. Sesión no válida o expirada.");
      window.location.href = "/auth";
    }

    return Promise.reject(error);
  }
);

export default apiAxios;
