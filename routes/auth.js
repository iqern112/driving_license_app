const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login Page
router.get('/login', (req, res) => {
    res.render('login');
});

// Handle Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (user && user.password === password) {
        req.session.user = user;
        return res.redirect('/dashboard');
    }
    res.status(401).send('Invalid credentials');
});

// Register Page
router.get('/register', (req, res) => {
    res.render('register');
});

// Handle Registration
router.post('/register', async (req, res) => {
    const { username, password, first_name, last_name } = req.body;
    try {
        await User.create({ username, password, first_name, last_name });
        res.redirect('/auth/login');
    } catch (error) {
        res.status(400).send('Error creating user');
    }
});

module.exports = router;
