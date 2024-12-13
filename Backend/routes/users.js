const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      // Validações básicas
      if (!username || !email || !password) {
        return res.status(400).json({ message: 'Preencha todos os campos!' });
      }
  
      // Verifica se o usuário já existe
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'E-mail já cadastrado!' });
      }
  
      // Cria novo usuário
      const user = new User({ username, email, password });
      await user.save();
  
      res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
    }
  });

// Rota para listar todos os usuários
router.get('/user', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send('Erro ao listar usuários');
    }
});

// Rota para buscar um usuário específico
router.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send('Erro ao buscar usuário');
    }
});

module.exports = router;
