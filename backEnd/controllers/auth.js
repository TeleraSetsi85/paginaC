import { ADMIN_PASSWORD, ADMIN_USER } from "../config.js";

// Permite iniciar sesión
export const login = (req, res) => {
  try {
    const { user, password } = req.body;

    if (user === ADMIN_USER && password === ADMIN_PASSWORD) {
      req.session.user = user;

      return res.status(200).json({
        message: "Sesión iniciada correctamente",
        body: user,
      });
    } else {
      return res.status(401).json({
        message: "Error al intentar iniciar sesión: Credenciales incorrectas",
      });
    }
  } catch (error) {
    const message = "Error al intentar iniciar sesión: " + error;
    console.log(message);
    res.status(500).json({
      message: message,
    });
  }
};

// Permite cerrar sesión
export const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      const message = "Error al intentar cerrar sesión: " + err;
      console.log(message);
      res.status(500).json({
        message: message,
      });
    }

    res.status(200).json({
      message: "Sesión cerrada correctamente",
    });
  });
};

// Verifica que la sesión este iniciada
export const checkAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(403).json({
      message: "Acceso bloqueado: Sesión no iniciada",
    });
  }
  next();
};
