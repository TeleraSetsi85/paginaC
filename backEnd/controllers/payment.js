import { PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET, URI } from "../config.js";
import axios from "axios";
import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import { addClient, cancelClient, confirmClient, getClientInfo, getCourseInfo } from "./courses.js";

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
    const userURL = URI + "/checkUser/" + UUID;

    const formattedDate = new Date(showData.date).toLocaleString("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const qrImagePath = "./temp_qr.png";
    await QRCode.toFile(qrImagePath, userURL);

    doc.on("data", dataCallback);
    doc.on("end", endCallback);

    doc.image("./src/left.png", 20, 20, { width: 84 });
    doc.image("./src/right.png", 508, 20, { width: 84 });

    doc.rect(20, 20, 572, 254).lineWidth(2).strokeColor("#f0f0f0").stroke();

    doc.lineWidth(8).strokeColor("#a7a7a7").moveTo(100, 50).lineTo(280, 50).stroke();
    doc.lineWidth(8).strokeColor("#e4e4e4").moveTo(280, 50).lineTo(512, 50).stroke();

    doc.lineWidth(8).strokeColor("#e4e4e4").moveTo(100, 244).lineTo(332, 244).stroke();
    doc.lineWidth(8).strokeColor("#a7a7a7").moveTo(332, 244).lineTo(512, 244).stroke();

    doc.font("Helvetica-Bold").fontSize(18).text(`${showData.name}`, 120, 100, { width: 240, align: "left" });
    doc.font("Helvetica").fontSize(12).text(`${formattedDate}\n${showData.location}`, 120, 200, { width: 200, align: "left" });

    doc.image("./src/logotipo.jpg", 535, 220, { scale: 0.1 });
    doc.image(qrImagePath, 370, 80, { scale: 0.75 });
    doc.save();
    doc.rotate(-90, { origin: [368, 185] });
    doc.text(`$${showData.price_slot} MXN`, 368, 185);
    doc.restore();

    doc.end();
  } catch (error) {
    console.log("Error al intentar generar el ticket: " + error.message);
    if (errorCallback) errorCallback(error);
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { UUID } = req.query;

    await cancelClient(UUID);

    res.status(200).json({
      message: "Operación cancelada",
    });
  } catch (error) {
    const message = "Error al intentar cancelar la orden de pago: " + error;
    console.log(message);
    res.status(500).json({
      message: message,
    });
  }
};

export const checkTicket = async (req, res) => {
  try {
    const { UUID } = req.params;

    const [response] = await getClientInfo(UUID);

    res.status(200).json({
      message: "Verificación correcta",
      body: response,
    });
  } catch (error) {
    const message = "Error al intentar verificar el boleto: " + error;
    console.log(message);
    res.status(500).json({
      message: message,
    });
  }
};
