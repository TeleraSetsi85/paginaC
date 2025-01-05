import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Para obtener los parámetros de la URL
import { captureOrder } from "../api/servidor";
import Swal from "sweetalert2"; // Importa SweetAlert2

function ConfirmOrder() {
  const [pdfData, setPdfData] = useState(null);
  const location = useLocation(); // Para acceder a los parámetros de la URL

  useEffect(() => {
    // Función para obtener el PDF
    const fetchPdf = async () => {
      try {
        // Muestra el loader
        Swal.fire({
          title: "Cargando...",
          html: "Estamos obteniendo el PDF, por favor espera.",
          showConfirmButton: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const urlParams = new URLSearchParams(location.search);
        const UUID = urlParams.get("UUID");
        const token = urlParams.get("token");
        const payerID = urlParams.get("PayerID");

        if (!UUID || !token || !payerID) {
          throw new Error("Faltan parámetros en la URL");
        }

        const { data } = await captureOrder(UUID, token, payerID);

        if (data.message && data.pdf) {
          setPdfData(data.pdf);
        }

        Swal.close();
      } catch (error) {
        console.error("Error al obtener el PDF:", error);
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al obtener el PDF. Intenta nuevamente.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    };

    fetchPdf();
  }, [location]); // Dependencia en 'location' para actualizar si cambian los parámetros

  const downloadPdf = () => {
    if (pdfData) {
      const link = document.createElement("a");
      link.href = pdfData;
      link.download = "Ticket.pdf";
      link.click();
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
      <h2>Confirmación de la Orden</h2>
      {pdfData ? (
        <>
          <embed src={pdfData} width="100%" height="600px" />
          <button className="btn btn-primary mt-3" onClick={downloadPdf}>
            Descargar PDF
          </button>
        </>
      ) : (
        <p>Estamos obteniendo el PDF...</p>
      )}
    </div>
  );
}

export default ConfirmOrder;
