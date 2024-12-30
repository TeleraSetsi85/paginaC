import { PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET, URI } from "../config.js";
import axios from "axios";
import PDFDocument from "pdfkit";
import { addClient, confirmClient, getClientInfo, getCourseInfo } from "./courses.js";

const getOrder = async (UUID, { name, lastname }) => {
  const [courseData] = await getCourseInfo(UUID);
  const userId = await addClient(UUID, name, lastname);

  if (!courseData || !userId) {
    throw new Error("No se encontró información del curso o le faltan datos del usuario");
  }

  const formattedDate = new Date(courseData.date).toLocaleString("es-MX", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return {
    intent: "CAPTURE",
    purchase_units: [
      {
        items: [
          {
            name: courseData.name,
            description: `${formattedDate} en ${courseData.location}`,
            quantity: 1,
            unit_amount: {
              currency_code: "MXN",
              value: courseData.price_slot,
            },
          },
        ],

        amount: {
          currency_code: "MXN",
          value: courseData.price_slot,
          breakdown: {
            item_total: {
              currency_code: "MXN",
              value: courseData.price_slot,
            },
          },
        },
      },
    ],

    application_context: {
      return_url: URI + "/payment/capture-order/?UUID=" + userId,
      cancel_url: URI + "/payment/cancel-Payment/?UUID=" + userId,
      shipping_preference: "NO_SHIPPING",
      user_action: "PAY_NOW",
      brand_name: "Lexo Salmon",
    },
  };
};

const getAccessToken = async () => {
  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const {
    data: { access_token },
  } = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, params, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: {
      username: PAYPAL_API_CLIENT,
      password: PAYPAL_API_SECRET,
    },
  });

  return access_token;
};

export const createOrder = async (req, res) => {
  try {
    const { UUID } = req.params;
    const userData = req.body;

    if (!UUID || !userData) {
      throw new Error("Parametros o datos faltantes");
    }

    const order = await getOrder(UUID, userData);

    const access_token = await getAccessToken();

    const { data: response } = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });

    res.status(200).json({
      message: "Orden creada exitosamente.",
      orderId: response.id,
      link: response.links.find((link) => link.rel === "approve"),
    });
  } catch (error) {
    const message = "Error al intentar crear la orden de pago: " + error;
    console.log(message);
    res.status(500).json({
      message: message,
    });
  }
};

export const captureOrder = async (req, res) => {
  try {
    const { UUID, token } = req.query;

    const response = await axios.post(
      `${PAYPAL_API}/v2/checkout/orders/${token}/capture`,
      {},
      {
        auth: {
          username: PAYPAL_API_CLIENT,
          password: PAYPAL_API_SECRET,
        },
      }
    );

    const payment_ID = response.data.purchase_units[0].payments.captures[0].id;
    confirmClient(UUID, payment_ID);

    const doc = new PDFDocument();
    const chunks = [];

    generateTicket(
      doc,
      UUID,
      (chunk) => chunks.push(chunk),
      () => {
        const pdfBuffer = Buffer.concat(chunks);
        const base64Pdf = `data:application/pdf;base64,${pdfBuffer.toString("base64")}`;

        res.status(200).json({
          message: "Ticket generado correctamente",
          pdf: base64Pdf,
        });
      },
      (error) => {
        res.status(500).json({
          message: "Error al generar el ticket",
          error: error.message,
        });
      }
    );
  } catch (error) {
    const message = "Error al intentar capturar la orden de pago: " + error;
    console.log(message);
    res.status(500).json({
      message: message,
    });
  }
};

const generateTicket = async (doc, UUID, dataCallback, endCallback, errorCallback) => {
  try {
    const [userData] = await getClientInfo(UUID);
    const [showData] = await getCourseInfo(userData.course_id);

    doc.on("data", dataCallback);
    doc.on("end", endCallback);

    const margin = 20;
    const width = 612 - margin * 2;
    const height = 264 - margin * 2;
    doc.rect(margin, margin, width, height).lineWidth(2).strokeColor("#9EA18E").stroke();

    //doc.image("./src/logotipo.png", width - 20, height - 20, { scale: 0.25 });

    const formattedDate = new Date(showData.date).toLocaleString("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    doc.text(`${showData.name}`, 280, 40);
    doc.text(`${formattedDate}\n${showData.location}`, 280, 40);
    doc.text(`${showData.price_slot}`, 280, 40);

    doc.end();
  } catch (error) {
    console.log("Error al intentar generar el ticket: " + error.message);
    if (errorCallback) errorCallback(error);
  }
};
