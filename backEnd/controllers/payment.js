import { PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET, URI } from "../config.js";
import axios from "axios";
import { getCourseInfo } from "./courses.js";

const getOrder = async (UUID) => {
  const [courseData] = await getCourseInfo(UUID);

  if (!courseData) {
    throw new Error("No se encontró información del curso.");
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
      return_url: URI + "/payment/capture-order",
      cancel_url: URI + "/payment/cancel-Payment",
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

    const order = await getOrder(UUID);

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
    const { token } = req.query;

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

    return res.status(200).json({
      message: "Pago exitoso",
      body: response.data,
    });
  } catch (error) {
    const message = "Error al intentar capturar la orden de pago: " + error;
    console.log(message);
    res.status(500).json({
      message: message,
    });
  }
};
