import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';

dotenv.config();
const loginRouter = express.Router();

// Usuario predefinido
const adminUser = {
    email: 'admin@admin.com',
    password: 'admin'
};

// POST Login
loginRouter.post('/', (req, res) => {
    const { email, password } = req.body;

    // Validar que el JSON esté completo
    if (!email || !password) {
        return res.status(400).json({ message: "JSON incompleto" });
    }

    // Validar credenciales
    if (email === adminUser.email && password === adminUser.password) {
        // Crear el token JWT
        const emailAuth = { email }; // Datos para el token
        const accessToken = generateToken(emailAuth);

        return res.status(200).json({ message: "Inicio de sesión exitoso", accessToken });
    } else {
        return res.status(401).json({ message: "Credenciales incorrectas" });
    }
});

// Generar token JWT
function generateToken(emailAuth) {
    return jwt.sign(emailAuth, process.env.ACCESS_SECRET_TOKEN, { expiresIn: '1h' });
}

// POST Logout (opcional)
loginRouter.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: "Error cerrando la sesión" });
        }
        res.clearCookie('connect.sid'); // Limpiar la cookie de sesión
        return res.status(200).json({ message: "Cierre de sesión exitoso" });
    });
});

export default loginRouter;