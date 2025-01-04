import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function GoodMesa (){

    const navigate = useNavigate();

    const btnBack = ()=>{
        navigate('/');
    }

    useEffect(() => {
        Swal.fire({
            icon: "success",
            title: "Pago realizado",
            text: "Su pago se realizo con exito",
        }).then(() => {
            // Redirigir después de cerrar el modal
            navigate("/");
        });
        }, []); 
    return(
        <div>
            <div className="bg-dark text-white py-3 text-center">
                <header>Mensaje Importante</header>
            </div>
            <main className="container my-5">
            <h1>Su pago fue realizado con exito</h1>
            <button onClick={btnBack} className="goldenButton">Volver a página principal</button>
            </main>
        </div>
    );
}

export default GoodMesa;