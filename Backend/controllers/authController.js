const express = require('express');
const router = express.Router();

// authController.js
exports.register = (req, res) => {
    res.send('User registered successfully!');
};

exports.login = (req, res) => {
    res.send('Login successful!');
};
