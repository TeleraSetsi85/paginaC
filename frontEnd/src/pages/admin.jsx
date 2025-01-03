import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logOut, getCourses } from "../api/servidor";

function Admin() {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);

  const btnAdd = () => setModalOpen(true);
  const btnClose = () => setModalOpen(false);
  const btnLogOut = async () => {
    const response = await logOut();

    if (response.status === 200) {
      navigate("/");
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        setCourses(response.data.body);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <button onClick={btnLogOut}>Cerrar sesión</button>
      <header className="bg-dark text-white py-3 text-center">
        <h1>Administrador de eventos</h1>
      </header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <button className="nav-link btn btn-link text-white" onClick={() => console.log("Eventos disponibles")}>
                  Eventos disponibles
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link text-white" onClick={btnAdd}>
                  Agregar evento
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link text-white" onClick={() => console.log("Eliminar evento")}>
                  Eliminar evento
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container my-4">
        <div>
          {console.log(courses)}
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id}>
                <h3>{course.name}</h3>
                <p>{course.description}</p>
                <p>
                  {new Date(course.date).toLocaleString("es-MX", {
                    timeZone: "America/Mexico_City",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p>{course.slots} Lugares</p>
                <p>${course.price_slot} MXN</p>
              </div>
            ))
          ) : (
            <p>No hay eventos disponibles.</p>
          )}
        </div>
      </main>

      {isModalOpen && (
        <dialog open className="modal-dialog">
          <div>
            <h1>Registra tu evento</h1>
            <p id="close-modal" onClick={btnClose} style={{ cursor: "pointer" }}>
              &times;
            </p>
          </div>
          <div>
            <label htmlFor="nameEvent">Nombre del Evento</label>
            <input id="nameEvent" type="text" />

            <label htmlFor="description">Descripción del evento</label>
            <input id="description" type="text" />

            <label htmlFor="dateEvent">Fecha del evento</label>
            <input id="dateEvent" type="date" />

            <label htmlFor="costEvent">Costo del evento</label>
            <input id="costEvent" type="number" />
          </div>
        </dialog>
      )}
    </div>
  );
}

export default Admin;
