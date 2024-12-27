
import React, { useState } from "react";

function Event() {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

return (
    <>
        <header>
            <h1>Upcoming Events</h1>
        </header>
        <nav>
            {/* Timer del evento más cercano podría ir aquí */}
        </nav>
    <main>
        {/* Primer evento */}
        <section>
            <div>
                <h3>Nombre del evento</h3>
                <img src="" alt="photo-event" />
                <p>00/00/00</p>
                <p>00:00:00</p>
                <p>Descripción del evento</p>
                <p>Costo: $XX.XX</p>
                <button onClick={openModal}>Comprar ahora</button>
            </div>
        </section>

        {/* Modal para comprar boletos */}
        {isModalOpen && (
        <div className="modal-overlay">
            <dialog open>
                <div>
                <button onClick={closeModal} className="close-button">
                    &times;
                </button>
                <label htmlFor="name">Nombre Completo</label>
                <input id="name" type="text" placeholder="Ingresa nombre completo" />

                <label htmlFor="email">Correo Electrónico</label>
                <input id="email" type="email" placeholder="ejemplo@gmail.com" />

                <label htmlFor="quantity">Cantidad de boletos</label>
                <input id="quantity" type="number" min="1" />

                <label htmlFor="payment">Método de pago</label>
                <select id="payment">
                    <option value="credit-card">Tarjeta de crédito</option>
                    <option value="paypal">PayPal</option>
                    <option value="bank-transfer">Transferencia bancaria</option>
                </select>

                        <button className="pay-button">Realizar pago</button>
                    </div>
                </dialog>
            </div>
        )}
        </main>
    </>
);
}

export default Event;
