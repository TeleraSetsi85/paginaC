import React, { useState, useEffect } from "react";
import { getActiveCourses } from "../api/servidor";
import "./styles/events.css"

function Event() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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
                  <button onClick={openModal} className="btn btn-primary" id="comprar">
                    Comprar ahora
                  </button>
                </div>
              </div>
            </section>
          ))
        ) : (
          <p className="text-center text-white">No hay eventos disponibles.</p>
        )}

{isModalOpen && (
  <div className="modal fade show d-block" tabIndex="-1" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered modal-lg">
      <div className="modal-content border-0 shadow-lg rounded">
        <div className="modal-header bg-dark text-white">
          <h5 className="modal-title">Comprar Boletos</h5>
          <button type="button" className="btn-close" onClick={closeModal} aria-label="Cerrar"></button>
        </div>
        <div className="modal-body">
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="form-label fw-bold">
                Nombres
              </label>
              <input id="name" type="text" className="form-control form-control-lg" placeholder="Ingresa nombre completo" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="form-label fw-bold">
                Apellidos
              </label>
              <input id="email" type="email" className="form-control form-control-lg" placeholder="ejemplo@gmail.com" />
            </div>
            <div className="mb-4">
              <label htmlFor="quantity" className="form-label fw-bold">
                Cantidad de boletos
              </label>
              <input id="quantity" type="number" className="form-control form-control-lg" min="1" />
            </div>
            <div className="mb-4">
              <label htmlFor="payment" className="form-label fw-bold">
                Método de pago
              </label>
              <select id="payment" className="form-select form-select-lg">
                <option value="credit-card">Tarjeta de crédito</option>
                <option value="paypal">PayPal</option>
                <option value="bank-transfer">Transferencia bancaria</option>
              </select>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={closeModal}>
            Cerrar
          </button>
          <button className="btn btn-primary pay-button">Realizar pago</button>
        </div>
      </div>
    </div>
  </div>
)}

      </main>
    </>
  );
}

export default Event;
