import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function Err() {
    const navigate = useNavigate();

    const btnBack = () => {
    navigate("/");
};

useEffect(() => {
    Swal.fire({
        icon: "error",
        title: "Pago Cancelado",
        text: "Su pago fue cancelado",
    }).then(() => {
        // Redirigir después de cerrar el modal
        navigate("/");
    });
    }, []); 
return (
    <div>
        <header className="bg-dark text-white py-3 text-center">
            <h1>Mensaje importante</h1>
        </header>
        <main className="container my-5">
            <h1>Se canceló el pago</h1>
            <button onClick={btnBack} className="goldenButton">Volver a página principal</button>
            </main>
        </div>
    );
}

export default Err;
