import express from 'express';
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
        // Guardar la sesión
        req.session.user = { email };
        return res.status(200).json({ message: "Inicio de sesión exitoso" });
    } else {
        return res.status(401).json({ message: "Credenciales incorrectas" });
    }
});

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