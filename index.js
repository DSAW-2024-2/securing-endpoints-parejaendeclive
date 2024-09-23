import express from 'express';
import productsRouter from './shop_routes/products.js';
import usersRouter from './shop_routes/users.js';
import ordersRouter from './shop_routes/orders.js';
const port = process.env.PORT || 3000;
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// principal route
app.get("/", (req, res) => {
    res.send("Server is running. Available routes: /users, /products and /orders");
});

// users routes
app.use('/users', usersRouter);

// products routes
app.use('/products', productsRouter);

// orders routes
app.use('/orders', ordersRouter);

// validation route not found

app.use((req, res, next) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});


// listen server
app.listen(port, () => {
    console.log('Server listening on', port);
});