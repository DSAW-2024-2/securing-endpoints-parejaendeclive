import express from 'express';
import { users } from './users.js';  // Import users
import { products } from './products.js';  // Import products

const orders_router = express.Router();

// orders
let orders = [];
function string_validation( id,userId,productId, quantity,status){
    let data =[id,userId,productId,quantity,status]
    return data.every(item => typeof item === 'string');
    
}

// GET orders
orders_router.get('/', (req, res) => {
    res.json(orders);
});

// POST new order
orders_router.post('/', (req, res) => {
    //destructuring 
    let { id, userId, productId, quantity, status } = req.body;

    // quantity string
    quantity = String(quantity);

    // JSON incomplete
    if (!id || !userId || !productId || !quantity || !status) {
        return res.status(400).json({ message: "JSON incomplete" });
    }

    if(!string_validation(id,userId,productId,quantity,status)){
        return res.status(400).json({ error: 'type of data invalid' }); 
    }
    
    if (!/^\d+$/.test(quantity)) {
        return res.status(400).json({ message: "quantity must be a valid number" });
    }

    
    const userExists = users.find(user => user.id === userId);
    if (!userExists) {
        return res.status(404).json({ message: "User not found" });
    }

    
    const productExists = products.find(product => product.id === productId);
    if (!productExists) {
        return res.status(404).json({ message: "product not found" });
    }

    
    const newOrder = { id, userId, productId, quantity, status };
    orders.push(newOrder);
    res.status(201).json({ message: "Order created"});
});

// GET order by id
orders_router.get('/:id', (req, res) => {
    const order = orders.find(o => o.id === req.params.id);
    if (!order) {
        return res.status(404).json({ message: "order not founded" });
    }
    res.json(order);
});


export default orders_router;