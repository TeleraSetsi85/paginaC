
import React, { useState } from "react";
import '../styles/events.css';


function Event() {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

return (
    <>
    <header className="bg-dark text-white py-3 text-center">
        <h1>Próximos Eventos</h1>
    </header>

    <nav className="bg-light py-2 text-center">
        {/* Puedes añadir un temporizador o enlaces aquí */}
        <span className="text-muted">Para acceder a los eventos, click en "Comprar ahora"</span>
    </nav>

    <main className="container my-5">
        {/* Primer evento */}
        <section className="row mb-4">
            <div className="col-md-6 offset-md-3 card shadow-sm p-4">
                <h3 className="card-title text-center">Nombre del evento</h3>
                <img
                    src="/img/main 1.jpg"
                    alt="photo-event"
                    className="card-img-top mb-3"
                    style={{ height: "200px", objectFit: "cover" }}
                />
                <p className="text-center mb-1">Fecha: 00/00/00</p>
                <p className="text-center mb-3">Hora: 00:00:00</p>
                <p className="card-text">Descripción del evento</p>
                <p className="fw-bold text-center">Costo: $XX.XX</p>
                <div className="d-grid">
                    <button onClick={openModal} className="btn btn-primary">
                        Comprar ahora
                    </button>
                </div>
            </div>
        </section>

        {/* Modal para comprar boletos */}
        {isModalOpen && (
            <div className="modal fade show d-block" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Comprar Boletos</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={closeModal}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">
                                        Nombre Completo
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        className="form-control"
                                        placeholder="Ingresa nombre completo"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Correo Electrónico
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        className="form-control"
                                        placeholder="ejemplo@gmail.com"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="quantity" className="form-label">
                                        Cantidad de boletos
                                    </label>
                                    <input
                                        id="quantity"
                                        type="number"
                                        className="form-control"
                                        min="1"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="payment" className="form-label">
                                        Método de pago
                                    </label>
                                    <select id="payment" className="form-select">
                                        <option value="credit-card">
                                            Tarjeta de crédito
                                        </option>
                                        <option value="paypal">PayPal</option>
                                        <option value="bank-transfer">
                                            Transferencia bancaria
                                        </option>
                                    </select>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-secondary"
                                onClick={closeModal}
                            >
                                Cerrar
                            </button>
                            <button className="btn btn-primary pay-button">
                                Realizar pago
                            </button>
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
