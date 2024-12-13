/*const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

// Rota para registrar novos usuarios

router.post('/register',authController.register)

// rota para login

router.post('/login',authController.login);

module.exports = router;
*/
// routes/authRoutes.js

const express = require('express');
const { register, login } = require('../controllers/authController'); // Importa as funções do controlador
const router = express.Router();

// Rota para registrar novos usuários
router.post('/register', register);

// Rota para login
router.post('/login', login);

module.exports = router; // Exporta as rotas
