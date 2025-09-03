import * as auth from "../config/auth.js";

export const authMiddleware = function (roles = [], allowAnonymous = false) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Si la ruta permite acceso anónimo y NO hay token → dejar pasar
    if (allowAnonymous && !authHeader) {
      return next();
    }

    // Si no hay token y no está permitido anónimo → bloquear
    if (!authHeader) {
      return res.status(401).json({ error: "Token requerido" });
    }

    // Si hay token pero formato inválido
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token inválido" });
    }

    try {
      const token = authHeader.split(" ")[1];
      const decoded = auth.verifyToken(token);

      if (roles.length > 0 && !roles.includes(decoded.rol)) {
        return res.status(403).json({ error: "Permisos insuficientes" });
      }

      req.user = decoded;
      next();
    } catch (error) {
      return res
        .status(error.name === "TokenExpiredError" ? 401 : 403)
        .json({ error: error.message });
    }
  };
};