import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import { cancelOrder } from "../api/servidor";

function CancelOrder() {
  const navigate = useNavigate();
  const location = useLocation(); // Para obtener los parámetros de la URL

  useEffect(() => {
    const confirmCancellation = async () => {
      try {
        // Extrae UUID y token de los parámetros de la URL
        const urlParams = new URLSearchParams(location.search);
        const UUID = urlParams.get("UUID");
        const token = urlParams.get("token");

        // Asegúrate de que ambos parámetros existen
        if (!UUID || !token) {
          throw new Error("Faltan parámetros necesarios");
        }

        // Llama a la API para cancelar la orden
        await cancelOrder(UUID, token);

        // Muestra el mensaje de confirmación
        Swal.fire("Orden Cancelada", "Tu orden ha sido cancelada con éxito.", "success").then(() => {
          navigate("/events");
        });
      } catch (error) {
        console.error("Error cancelando la orden:", error);

        // Muestra un mensaje de error al usuario
        Swal.fire("Error", "No se pudo cancelar la orden. Intenta nuevamente más tarde.", "error").then(() => {
          navigate("/events");
        });
      }
    };

    confirmCancellation();
  }, [navigate, location]); // Agregar location en las dependencias

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <p>Cancelando tu orden...</p>
    </div>
  );
}

export default CancelOrder;
