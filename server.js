const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src')));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/contact')
    .then(() => console.log("MongoDB connection successful"))
    .catch(err => console.error("MongoDB connection error:", err));

// Schema and Model
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
});
const Users = mongoose.model('Users', userSchema);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.post('/post', async (req, res) => {
    const { name, email, subject, message } = req.body;
    const user = new Users({ name, email, subject, message });
    try {
        await user.save();
        res.send("Message sent successfully");
    } catch (err) {
        res.status(500).send("Error saving message");
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
