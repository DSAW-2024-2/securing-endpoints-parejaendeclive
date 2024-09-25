import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Obtener token del header

    // Si no hay token, retornar no autorizado
    if (token == null) return res.sendStatus(401);

    // Verificar el token JWT
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, user) => {
        if (err) return res.status(403).json({ error: "Token JWT inválido" });

        req.user = user; // Almacenar la información del usuario
        next(); // Continuar si el token es válido
    });
}
