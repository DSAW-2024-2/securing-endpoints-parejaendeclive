import express from 'express';
const products_router = express.Router();

// default products
export const products = [
    {
        id: "5",
        name: "phone",
        price: "1500000",
        category: "technology"
    },
    {
        id: "7",
        name: "rice",
        price: "10000",
        category: "food"
    }
];
function string_validation( id,name,price, category){
    let data =[id,name,price,category]
    return data.every(item => typeof item === 'string');
    
}

//  GET products
products_router.get('/', (req, res) => {
    try {
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "error getting products", error: error.message });
    }
});

// POST product
products_router.post('/', (req, res) => {
    try {
        const { id, name, price, category } = req.body;
        if (!id || !name || !price || !category) {
            return res.status(400).json({ message: "JSON incomplete" });
        }
        if(!string_validation(id,name,price,category)){
            return res.status(400).json({ error: 'type of data invalid' }); 
    
        }
        if (products.some(p => p.id === id)) {
            return res.status(400).json({ message: "ID in use" });
        }
        if (!/^\d+$/.test(id)) {
            return res.status(400).json({ message: "ID must be a valid number" });
        }
        if (!/^\d+$/.test(price)) {
            return res.status(400).json({ message: "price must be a valid number" });
        }
        products.push({ id, name, price, category });
        res.status(201).json({ message: "Product added" });
    } catch (error) {
        res.status(500).json({ message: "Product not added", error: error.message });
    }
});

// GET product by id
products_router.get('/:id', (req, res) => {
    try {
        const product = products.find(p => p.id === req.params.id);
        if (!product) {
            return res.status(404).json({ message: "ID does not exist" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Product not founded", error: error.message });
    }
});

// PUT update product
products_router.put('/:id', (req, res) => {
    try {
        const { name, price, category } = req.body;
        
        const productId = req.params.id;
        
        if (!productId||!name || !price || !category) {
            return res.status(400).json({ message: "JSON incomplete" });
        }
        const productIndex = products.findIndex(p => p.id === productId);
        
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not founded" });
        }
        if (!/^\d+$/.test(productId)) {
            return res.status(400).json({ message: "ID must be a valid number" });
        }
        if (!/^\d+$/.test(price)) {
            return res.status(400).json({ message: "price must be a valid number" });
        }
        products[productIndex] = { ...products[productIndex],productId, name, price, category };
        res.json({ message: "Product updated" });
    } catch (error) {
        res.status(500).json({ message: "Product not updated", error: error.message });
    }
});

// DELETE product
products_router.delete('/:id', (req, res) => {
    try {
        const productIndex = products.findIndex(p => p.id === req.params.id);
        if (productIndex === -1) {
            return res.status(404).json({ message: "Product not founded" });
        }
        products.splice(productIndex, 1);
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: "Product not deleted", error: error.message });
    }
});

export default products_router;