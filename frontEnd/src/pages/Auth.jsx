import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Función de API
import { auth } from "../api/servidor";

function Auth() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ user: "l3x0S4lmOn1424", password: "PonerUnaContraseñaHasheada" });

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
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
      }
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
