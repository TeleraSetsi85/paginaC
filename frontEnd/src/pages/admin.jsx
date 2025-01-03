import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logOut, getCourses, addCourse, updateCourse, deleteCourse } from "../api/servidor";

const Admin = () => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: "",
    details: "",
    date: "",
    location: "",
    slots: 0,
    price: 0,
    status: true,
  });
  const [isEditing, setIsEditing] = useState(false); // Track whether we are editing an event
  const [courseId, setCourseId] = useState(null); // To store the course ID when editing

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [id]: value }));
  };

  const handleStatusChange = (e) => {
    setNewEvent((prev) => ({ ...prev, status: e.target.checked }));
  };

  const handleLogOut = async () => {
    try {
      const response = await logOut();
      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await getCourses();
      setCourses(response.data.body);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleAddEvent = async () => {
    try {
      const response = isEditing ? await updateCourse(courseId, newEvent) : await addCourse(newEvent);
      if (response.status === 200) {
        alert(isEditing ? "Evento actualizado con éxito" : "Evento agregado con éxito");
        setModalOpen(false);
        fetchCourses();
      } else {
        alert("Error al guardar el evento");
      }
    } catch (error) {
      console.error("Error saving course:", error);
      alert("Hubo un error al guardar el evento");
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      const response = await deleteCourse(id);
      if (response.status === 200) {
        alert("Evento borrado con éxito");
        fetchCourses();
      } else {
        alert("Error al borrar el evento");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("Hubo un error al borrar el evento");
    }
  };

  const handleEditEvent = (course) => {
    // Asegúrate de que la fecha esté en el formato adecuado para 'datetime-local'
    const formattedDate = new Date(course.date).toISOString().slice(0, 16); // Formato adecuado: 'YYYY-MM-DDTHH:MM'

    // Establecer el evento para editar con todos los detalles correctos
    setNewEvent({
      name: course.name,
      details: course.details,
      date: formattedDate,
      location: course.location,
      slots: course.slots,
      price: course.price_slot, // Asegúrate de que este es el nombre correcto en el servidor
      status: course.status,
    });

    // Guardar el ID del curso para futuras actualizaciones
    setCourseId(course.id);

    // Cambiar el estado a 'true' para indicar que estamos editando un evento
    setIsEditing(true);

    setModalOpen(true);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="admin-container">
      <header className="bg-dark text-white py-3 text-center">
        <h1>Administrador de Eventos</h1>
        <button onClick={handleLogOut} className="btn btn-danger mt-2">
          Cerrar sesión
        </button>
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
                <button
                  className="nav-link btn btn-link text-white"
                  onClick={() => {
                    setIsEditing(false);
                    setModalOpen(true);
                  }}
                >
                  Agregar Evento
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container my-4">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id} className={`card my-3 shadow-sm`}>
              <div className="card-body">
                <h5 className="card-title">{course.name}</h5>
                <p className="card-text">{course.details}</p>
                <p className="card-text">
                  Fecha:{" "}
                  {new Date(course.date).toLocaleString("es-MX", {
                    timeZone: "America/Mexico_City",
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <p className="card-text">Lugares: {course.slots}</p>
                <p className="card-text">Precio: ${course.price_slot} MXN</p>
                <p className="card-text">
                  <strong>Estado: </strong>
                  <span className={course.status ? "text-success" : "text-danger"}>{course.status ? "Activo" : "Inactivo"}</span>
                </p>
                <div className="d-flex justify-content-between">
                  <button className="btn btn-warning" onClick={() => handleEditEvent(course)}>
                    Editar
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDeleteEvent(course.id)}>
                    Borrar
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No hay eventos disponibles.</p>
        )}
      </main>

      {isModalOpen && (
        <>
          <div className="modal-overlay" onClick={() => setModalOpen(false)}></div>
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{isEditing ? "Editar Evento" : "Registra tu Evento"}</h5>
                  <button type="button" className="btn-close" aria-label="Cerrar modal" onClick={() => setModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Nombre del Evento
                    </label>
                    <input id="name" type="text" className="form-control" value={newEvent.name} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="details" className="form-label">
                      Descripción del Evento
                    </label>
                    <input id="details" type="text" className="form-control" value={newEvent.details} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">
                      Fecha del Evento
                    </label>
                    <input id="date" type="datetime-local" className="form-control" value={newEvent.date} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="location" className="form-label">
                      Ubicación del Evento
                    </label>
                    <input id="location" type="text" className="form-control" value={newEvent.location} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="slots" className="form-label">
                      Número de Boletos Disponibles
                    </label>
                    <input id="slots" type="number" className="form-control" value={newEvent.slots} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Precio por Lugar
                    </label>
                    <input id="price" type="number" className="form-control" value={newEvent.price} onChange={handleInputChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="status" className="form-label">
                      Estado
                    </label>
                    <input id="status" type="checkbox" className="form-check-input" checked={newEvent.status} onChange={handleStatusChange} />
                    <span className="ms-2">{newEvent.status ? "Activo" : "Inactivo"}</span>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                    Cerrar
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleAddEvent}>
                    {isEditing ? "Actualizar Evento" : "Guardar Evento"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Admin;
