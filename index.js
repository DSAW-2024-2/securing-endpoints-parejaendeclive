import express from 'express';
import productsRouter from './shop_routes/products.js';
import usersRouter from './shop_routes/users.js';
import ordersRouter from './shop_routes/orders.js';
import cors from 'cors';
import loginRouter from './shop_routes/login.js'; // Ruta de login
import { authenticate } from './shop_routes/authenticate.js'; // Importar middleware de autenticación
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno

const port = process.env.PORT || 3000;
const app = express();


// Middleware para parsear JSON
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000',  // O el dominio desde el cual estarías haciendo las peticiones
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Asegúrate de permitir todos los métodos necesarios
    allowedHeaders: ['Content-Type', 'Authorization'],  // Permitir el header 'Authorization'
    credentials: true  // Si planeas manejar cookies o sesiones
};
app.use(cors(corsOptions));
// Ruta principal
app.get("/", (req, res) => {
    res.send("Server is running. Available routes: /users, /products, /orders, and /login");
});

// Ruta de login
app.use('/login', loginRouter);

// Aplicar el middleware `authenticate` a las rutas que necesitan autenticación
app.use('/users', authenticate, usersRouter);
app.use('/products', authenticate, productsRouter);
app.use('/orders', authenticate, ordersRouter);

// Manejar ruta no encontrada
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

// Iniciar servidor
app.listen(port, () => {
    console.log('Server listening on', port);
});