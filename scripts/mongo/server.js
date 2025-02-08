const express = require('express');
const cors = require('cors');

const { MongooseConnect, UserRegistrar } = require("./mongoConnect");
const MongoUser = require("./mongoUser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); 

(async () => {
    await MongooseConnect.connect();
})();

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const userRegistrar = new UserRegistrar();
    try {
        const existingUser = await MongoUser.findOne({
            $or: [
                {username},
                {email},
            ]
        });
        if(existingUser) {
            return res.status(400).json({error: "dupeUser"});
        }
        await userRegistrar.register(username, email, password);
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'User registration failed' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const mongoUser = await MongoUser.findOne({ username });

    if (!mongoUser) {
        return res.status(401).json({ message: "User not found" });
    }

    if (mongoUser.password !== password) {
        return res.status(401).json({ message: "Incorrect password" });
    }

    res.json({ message: "Login successful" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));