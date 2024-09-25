import express from 'express';
import session from 'express-session';
import productsRouter from './shop_routes/products.js';
import usersRouter from './shop_routes/users.js';
import ordersRouter from './shop_routes/orders.js';
import loginRouter from './shop_routes/login.js'; // Import the login route

const port = process.env.PORT || 3000;
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Middleware for session management
app.use(session({
    secret: 'mysecretkey', // Clave secreta para firmar la cookie de sesión
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 // 1 hora de duración para la cookie
    }
}));

// Principal route
app.get("/", (req, res) => {
    res.send("Server is running. Available routes: /users, /products, /orders, and /login");
});

// Login route
app.use('/login', loginRouter);

// Middleware to protect routes (authentication check)
function authMiddleware(req, res, next) {
    if (req.session.user) {
        next(); // If session exists, allow access
    } else {
        res.status(401).json({ message: "Acceso no autorizado" });
    }
}

// Apply the authMiddleware to protect the following routes
app.use('/users', authMiddleware, usersRouter);
app.use('/products', authMiddleware, productsRouter);
app.use('/orders', authMiddleware, ordersRouter);

// Route not found validation
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

// Listen server
app.listen(port, () => {
    console.log('Server listening on', port);
});