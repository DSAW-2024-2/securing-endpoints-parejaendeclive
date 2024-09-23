import express from 'express';
const route_users = express.Router();

// default users
export let users = [
    {
        id: "2",
        name: "Andre",
        email: "Andre@gmail.com",
        age: "19"
    },
    {
        id: "3",
        name: "samu",
        email: "samu@gmail.com",
        age: "18"
    }
];

function string_validation( id,name,email,age){
    let data =[id,name,email,age]
    return data.every(item => typeof item === 'string');
    
}

// GET all users
route_users.get('/', (req, res) => {
    res.json(users);
});

// GET users by id
route_users.get('/:id', (req, res) => {
    const user = users.find(user => user.id === req.params.id); 
    if (!user) {
        return res.status(404).send('User not founded');
    }
    res.json(user);
});

// POST user
route_users.post('/', (req, res) => {
    const { id, name, email, age } = req.body;
    if (!id || !name || !email || !age) {
        return res.status(400).json({ error: 'JSON incomplete' });
    }
    
    if(!string_validation(id,name,email,age)){
        return res.status(400).json({ error: 'type of data invalid' }); 

    }
   

    if(id ||name ||email||age)
    if (users.some(u => u.id === id)) {
        return res.status(400).json({ message: "ID in use" });
    }
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ message: "ID must be a valid number" });
    }
    if (!/^\d+$/.test(age)) {
        return res.status(400).json({ message: "age must be a valid number" });
    }
        const new_user = { id, name, email, age };
        users.push(new_user);
        res.send(users);
    
    
});

// PUT update user
route_users.put('/:id', (req, res) => {
    const { name, email, age } = req.body;
    const id = req.params.id;
    const index = users.findIndex(i => i.id === id);
    if (index < 0) {
        return res.status(404).send('ID does not exist');
    }
    if (!id || !name || !email || !age) {
        return res.status(400).json({ error: 'JSON incomplete' }); 
    }
    if (!/^\d+$/.test(id)) {
        return res.status(400).json({ message: "ID must be a valid number" });
    }
    if (!/^\d+$/.test(age)) {
        return res.status(400).json({ message: "age must be a valid number" });
    }
    const update_user = { id, name, email, age };
    users[index] = update_user;
    res.send(users);
});

// DELETE user
route_users.delete('/:id', (req, res) => {
    const id = req.params.id;
    const index = users.findIndex(i => i.id === id);
    if (index < 0) {
        return res.status(404).send('User not founded');
    }
    users.splice(index, 1);
    res.send(users);
});

export default route_users;
