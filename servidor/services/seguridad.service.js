import { Persona } from "../schemas/persona.schema.js";

export const login = async function (objUsuario) {
    console.log("------------service------------");
    
    // Buscar usuario por email
    const usuario = await Persona.findOne({ "usuario.email": objUsuario.email }).lean();

    if (!usuario) {
        throw new Error("Usuario no encontrado");
    }

    // Validar rol ADMIN
    if (usuario.usuario.rol !== "admin") {
        throw new Error("Acceso denegado: No tiene rol administrador");
    }

    // Validar contraseña (aquí deberías usar bcrypt si está encriptada)
    if (usuario.usuario.password !== objUsuario.password) {
        throw new Error("Credenciales inválidas");
    }

    return {
        id_persona: usuario._id,
        email: usuario.usuario.email,
        rol: usuario.usuario.rol
    };
};
