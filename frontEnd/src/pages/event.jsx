import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getActiveCourses, createOrder } from "../api/servidor";

function Event() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getActiveCourses();
        const fetchedCourses = response.data?.body || [];
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleBuyNow = (UUID) => {
    Swal.fire({
      title: "Comprar Boletos",
      html: `
        <form id="buy-tickets-form">
          <div class="mb-3">
            <label for="name" class="form-label">Nombres</label>
            <input id="name" type="text" class="form-control" placeholder="Ingresa nombre completo" />
          </div>
          <div class="mb-3">
            <label for="lastName" class="form-label">Apellidos</label>
            <input id="lastName" type="text" class="form-control" placeholder="Ingresa apellidos" />
          </div>
        </form>
        <p>Método de pago: PayPal</p>
      `,
      confirmButtonText: "Realizar pago",
      showCancelButton: true,
      cancelButtonText: "Cerrar",
      preConfirm: () => {
        const name = document.getElementById("name").value;
        const lastname = document.getElementById("lastName").value;

        if (!name || !lastname) {
          Swal.showValidationMessage("Por favor, completa todos los campos.");
          return false;
        }

        return { name, lastname, payment: "PayPal" };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Procesando",
          text: "Por favor, espera mientras procesamos tu orden...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        try {
          const { data } = await createOrder(UUID, result.value);
          Swal.close();
          window.location.href = data.link.href;
        } catch (error) {
          Swal.fire("Error", "Ocurrió un problema al procesar tu orden. Intenta nuevamente.", "error");
          console.error("Error al crear la orden:", error);
        }
      }
    });
  };

  return (
    <>
      <header className="bg-dark text-white py-3 text-center">
        <h1>Próximos Eventos</h1>
      </header>

      <nav className="bg-light py-2 text-center">
        <span className="text-muted">Para acceder a los eventos, haz clic en "Comprar ahora"</span>
      </nav>

      <main className="container my-5">
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <section key={index} className="row mb-4">
              <div className="col-md-6 offset-md-3 card shadow-sm p-4">
                <h3 className="card-title text-center">{course.name}</h3>
                <p className="text-center mb-1">
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
                <p className="card-text">{course.details || "Sin descripción"}</p>
                <p className="fw-bold text-center">Costo: ${course.price_slot}</p>
                <div className="d-grid">
                  <button onClick={() => handleBuyNow(course.id)} className="btn btn-primary">
                    Comprar ahora
                  </button>
                </div>
              </div>
            </section>
          ))
        ) : (
          <p className="text-center text-white">No hay eventos disponibles.</p>
        )}
      </main>
    </>
  );
}

export default Event;
