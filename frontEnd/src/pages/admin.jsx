import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { useNavigate } from "react-router-dom";
import { logOut, getCourses, addCourse, updateCourse, deleteCourse, getUsersInfo } from "../api/servidor";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

const Admin = () => {
  const navigate = useNavigate();

  // Estado para manejar el formulario
  const [courses, setCourses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newEvent, setNewEvent] = useState({
    id: "",
    name: "",
    details: "",
    date: "",
    location: "",
    slots: 0,
    price: 0,
    status: true,
  });

  const handleEditEvent = async (course) => {
    const formattedDate = new Date(course.date).toISOString().slice(0, 16);

    setNewEvent({
      id: course.id,
      name: course.name,
      details: course.details,
      date: formattedDate,
      location: course.location,
      slots: course.slots,
      price: course.price_slot,
      status: course.status,
    });

    setIsEditing(true);
  };

  const openModal = async () => {
    try {
      const { value: formValues, isDismissed } = await Swal.fire({
        title: isEditing ? "Editar Evento" : "Agregar Evento",
        html: `
          <input id="name" class="swal2-input" placeholder="Nombre" value="${isEditing ? newEvent.name : ""}" />
          <textarea id="details" class="swal2-textarea" placeholder="Detalles">${isEditing ? newEvent.details : ""}</textarea>
          <input id="date" type="datetime-local" class="swal2-input" value="${isEditing ? newEvent.date : ""}" />
          <input id="location" class="swal2-input" placeholder="Ubicación" value="${isEditing ? newEvent.location : ""}" />
          <input id="slots" type="number" class="swal2-input" placeholder="Lugares" value="${isEditing ? newEvent.slots : ""}" />
          <input id="price" type="number" class="swal2-input" placeholder="Precio" value="${isEditing ? newEvent.price : ""}" />
          <label style="margin-top: 10px;">
            <input id="status" type="checkbox" ${newEvent.status ? "checked" : ""} />
            Activo
          </label>
        `,
        focusConfirm: false,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        preConfirm: () => {
          const name = document.getElementById("name").value;
          const details = document.getElementById("details").value;
          const date = document.getElementById("date").value;
          const location = document.getElementById("location").value;
          const slots = parseInt(document.getElementById("slots").value, 10);
          const price = parseFloat(document.getElementById("price").value);
          const status = document.getElementById("status").checked;

          if (!name || !details || !date || !location || !slots || !price) {
            Swal.showValidationMessage("Todos los campos son obligatorios");
            return null;
          }
          return { name, details, date, location, slots, price, status };
        },
      });

      if (isDismissed) {
        setIsEditing(false);
        return;
      }

      if (formValues) {
        const response = isEditing ? await updateCourse(newEvent.id, formValues) : await addCourse(formValues);

        if (response.status === 200) {
          Swal.fire({
            title: isEditing ? "Evento Actualizado" : "Evento Agregado",
            text: "El evento se guardó con éxito.",
            icon: "success",
          });
          setIsEditing(false);
          fetchCourses();
        } else {
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al guardar el evento.",
            icon: "error",
          });
        }
      }
    } catch (error) {
      console.error("Error al guardar el evento:", error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un problema al guardar el evento.",
        icon: "error",
      });
    }
  };

  // Cerrar sesión
  const handleLogOut = async () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    // Mostrar el modal de confirmación
    swalWithBootstrapButtons
      .fire({
        title: "¿Estas seguro?",
        text: "Estas apunto de cerrar sesion",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Cerrar Sesion",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await logOut();
            if (response.status === 200) {
              swalWithBootstrapButtons.fire({
                title: "Has cerrado sesion",
                text: "Se cerro la sesion con exito",
                icon: "success",
              });
              navigate("/");
            }
          } catch (error) {
            // Manejar errores al cerrar sesión
            console.error("Error logging out:", error);
            swalWithBootstrapButtons.fire({
              title: "Error",
              text: "There was a problem logging out.",
              icon: "error",
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Modal para la cancelación
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "Se cancelo con exito",
            icon: "error",
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

  // Borrar un curso
  const handleDeleteEvent = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-danger",
        cancelButton: "btn btn-secondary",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará el curso permanentemente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await deleteCourse(id);
            if (response.status === 200) {
              swalWithBootstrapButtons.fire({
                title: "Eliminado",
                text: "El curso ha sido eliminado con éxito.",
                icon: "success",
              });
              fetchCourses(); // Refrescar la lista de cursos
            } else {
              swalWithBootstrapButtons.fire({
                title: "Error",
                text: "No se pudo eliminar el curso.",
                icon: "error",
              });
            }
          } catch (error) {
            console.error("Error deleting course:", error);
            swalWithBootstrapButtons.fire({
              title: "Error",
              text: "Ocurrió un problema al intentar eliminar el curso.",
              icon: "error",
            });
          }
        }
      });
  };

  //Boton para detalles
  const btnDetails = async (UUID) => {
    try {
      // Obtiene información de los usuarios
      const {
        data: { body: usersInfo },
      } = await getUsersInfo(UUID);

      // Verifica si el array está vacío
      if (!usersInfo || usersInfo.length === 0) {
        Swal.fire({
          title: "Sin clientes",
          text: "No hay clientes registrados aún.",
          icon: "info",
          confirmButtonText: "Aceptar",
        });
        return;
      }

      const columns = [
        { field: "name", headerName: "Nombre", width: 150 },
        { field: "lastname", headerName: "Apellido", width: 150 },
        {
          field: "date",
          headerName: "Fecha",
          width: 150,
          valueFormatter: ({ value }) =>
            new Date(value).toLocaleString("es-MX", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
        },
        { field: "paymentId", headerName: "Pago", width: 200 },
      ];

      const rows = usersInfo.map((user, index) => ({
        id: index + 1,
        name: user.client_name,
        lastname: user.client_lastname,
        date: user.date,
        paymentId: user.payment_ID,
      }));

      // Crea un contenedor para renderizar DataGrid
      const swalContainer = document.createElement("div");
      swalContainer.style.height = "400px";
      swalContainer.style.width = "100%";

      const root = createRoot(swalContainer);
      root.render(
        <ThemeProvider theme={createTheme()}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            disableSelectionOnClick // Desactiva la selección de filas
          />
        </ThemeProvider>
      );

      // Muestra el modal de SweetAlert2
      Swal.fire({
        title: "Detalles del Evento",
        html: swalContainer,
        width: "80%",
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: "Cerrar",
        willClose: () => {
          // Limpia el contenedor React al cerrar el modal
          root.unmount();
        },
      });
    } catch (error) {
      console.error("Error al obtener detalles de usuarios:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo cargar la información de los usuarios.",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  // Efecto para cargar cursos al iniciar
  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (isEditing) {
      openModal();
    }
  }, [isEditing]);

  return (
    <div className="admin-container">
      <header className="bg-dark text-white py-3 text-center">
        <h1>Administrador de Eventos</h1>
        <button onClick={handleLogOut} className="btn btn-danger mt-2">
          Cerrar sesión
        </button>
        <button className="nav-link btn btn-link text-white" onClick={() => openModal()}>
          Agregar Evento
        </button>
      </header>

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
                  <button className="btn btn-primary" onClick={() => btnDetails(course.id)}>
                    Detalles
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
    </div>
  );
};

export default Admin;
