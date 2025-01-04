import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logOut, getCourses, addCourse, updateCourse, deleteCourse } from "../api/servidor";

const Admin = () => {
  const navigate = useNavigate();

  // Estado para manejar cursos, modal, y datos del formulario
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [courseId, setCourseId] = useState(null);
  const [newEvent, setNewEvent] = useState({
    name: "",
    details: "",
    date: "",
    location: "",
    slots: 0,
    price: 0,
    status: true,
  });

  // Manejo de inputs del formulario
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [id]: value }));
  };

  const handleStatusChange = (e) => {
    setNewEvent((prev) => ({ ...prev, status: e.target.checked }));
  };

  // Cerrar sesión
  const handleLogOut = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
  
    // Mostrar el modal de confirmación
    swalWithBootstrapButtons.fire({
      title: "¿Estas seguro?",
      text: "Estas apunto de cerrar sesion",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Cerrar Sesion",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await logOut();
          if (response.status === 200) {
            swalWithBootstrapButtons.fire({
              title: "Has cerrado sesion",
              text: "Se cerro la sesion con exito",
              icon: "success"
            });
            navigate("/");
          }
        } catch (error) {
          // Manejar errores al cerrar sesión
          console.error("Error logging out:", error);
          swalWithBootstrapButtons.fire({
            title: "Error",
            text: "There was a problem logging out.",
            icon: "error"
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Modal para la cancelación
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "Se cancelo con exito",
          icon: "error"
        });
      }
    });
  };
  

  // Obtener cursos
  const fetchCourses = async () => {
    try {
      const response = await getCourses();
      setCourses(response.data.body);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Agregar o actualizar un curso
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

  // Borrar un curso
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

  // Editar un curso
  const handleEditEvent = (course) => {
    const formattedDate = new Date(course.date).toISOString().slice(0, 16);
    setNewEvent({
      name: course.name,
      details: course.details,
      date: formattedDate,
      location: course.location,
      slots: course.slots,
      price: course.price_slot,
      status: course.status,
    });
    setCourseId(course.id);
    setIsEditing(true);
    setModalOpen(true);
  };

  // Efecto para cargar cursos al iniciar
  useEffect(() => {
    fetchCourses();
  }, []);

  const btnDetails = ()=>{
    let div = document.getElementById('divDetails');
    div.innerHTML = `
    <div>
      <header>Usuarios registrados</header>
      
    <button>Ocultar</button>
    </div>
    `;
  }

  return (
    <div className="admin-container">
      {/* Encabezado */}
      <header className="bg-dark text-white py-3 text-center">
        <h1>Administrador de Eventos</h1>
        <button onClick={handleLogOut} className="btn btn-danger mt-2">
          Cerrar sesión
        </button>
        <button
          className="nav-link btn btn-link text-white"
          onClick={() => {
            setIsEditing(false);
            setModalOpen(true);
          }}
        >
          Agregar Evento
        </button>
      </header>

      {/* Lista de eventos */}
      <main className="container my-4">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id} className="card my-3 shadow-sm">
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
                <p className="card-text">Ubicación: {course.location}</p>
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
                  <button className="btn btn-primary" onClick={btnDetails}>Detalles</button>
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

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-container">
          <div className="modal-overlay" onClick={() => setModalOpen(false)}></div>
          <div className="modal show d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{isEditing ? "Editar Evento" : "Registra tu Evento"}</h5>
                  <button type="button" className="btn-close" onClick={() => setModalOpen(false)}></button>
                </div>
                <div className="modal-body">
                  {["name", "details", "date", "location", "slots", "price"].map((field) => (
                    <div key={field} className="mb-3">
                      <label htmlFor={field} className="form-label">
                        {field === "slots" ? "Número de Boletos Disponibles" : field === "price" ? "Precio por Lugar" : `Nombre del ${field}`}
                      </label>
                      <input
                        id={field}
                        type={field === "slots" || field === "price" ? "number" : field === "date" ? "datetime-local" : "text"}
                        className="form-control"
                        value={field === "date" ? (newEvent[field] ? new Date(newEvent[field]).toISOString().slice(0, 16) : "") : newEvent[field]}
                        onChange={handleInputChange}
                      />
                    </div>
                  ))}

                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" id="status" checked={newEvent.status} onChange={handleStatusChange} />
                    <label className="form-check-label" htmlFor="status">
                      {newEvent.status ? "Activo" : "Inactivo"}
                    </label>
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
        </div>
      )}
      {/*Detalles boton */}
      <div id="divDetails">

      </div>
    </div>
  );
};

export default Admin;
