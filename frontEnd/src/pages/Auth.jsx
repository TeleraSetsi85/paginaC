import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// Función de API
import { auth } from "../api/servidor";

function Auth() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ user: "", password: "" });

  const returnHome = () => navigate("/");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const login = async (e) => {
    e.preventDefault();
    if (userInfo.user.trim() !== "" && userInfo.password.trim() !== "") {
      try {
        const response = await auth(userInfo);
        if (response.status === 200) {
          sessionStorage.setItem("LSuser", JSON.stringify(response.data.body));
          Swal.fire({
            icon: "success",
            title: "Sesión iniciada correctamente",
            text: "Bienvenido al sistema",
          });
          navigate("/dashboard");
        } else {
          Swal.fire({
            icon: "error",
            title: "Error al iniciar sesión",
            text: "Credenciales incorrectas, por favor verifica.",
          });
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        Swal.fire({
          icon: "error",
          title: "Error en el servidor",
          text: "Hubo un problema al intentar iniciar sesión. Intenta más tarde.",
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Campos vacíos",
        text: "Por favor, llena todos los campos.",
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="card p-4 shadow-lg" style={{ width: "22rem" }}>
        <h3 className="text-center mb-4">Iniciar Sesión</h3>
        <form onSubmit={login}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Usuario
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="user"
              placeholder="Ingresa tu usuario"
              value={userInfo.user}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              value={userInfo.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="button" className="btn btn-secondary" onClick={returnHome}>
              Regresar
            </button>
            <button type="submit" className="btn btn-primary">
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Auth;
