import _express from "express";
import * as cnotificacion from "../controllers/notificacion.controller.js";
import * as mauth from "../middleware/auth.middleware.js";
const router = _express.Router();

// Solo lectura (sin token)
router.get('/detalle/:id', mauth.authMiddleware([], true), cnotificacion.findById);

// Buscar por email (también puede ser público si lo deseas)
router.get('/:id', mauth.authMiddleware([], true), cnotificacion.findByEmail);

// Crear notificación (requiere token)
router.post('/', mauth.authMiddleware(['admin']), cnotificacion.create);

// Marcar como leída (requiere token)
router.put('/leer/:id', mauth.authMiddleware(['admin']), cnotificacion.marcarComoLeida);

export default router;



