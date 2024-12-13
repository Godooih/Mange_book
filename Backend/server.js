require('dotenv').config(); // Carrega as variáveis de ambiente de um arquivo .env

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bookRoutes = require('./routes/books');
const authRoutes = require('./routes/authRoutes'); // Importa as rotas de autenticação
const userRoutes = require('./routes/users'); // Importa as rotas de usuários

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes); // Adiciona as rotas de autenticação
app.use('/api/user', userRoutes);

// Conexão com o MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB conectado'))
    .catch((err) => console.error('Erro ao conectar no MongoDB:', err));

// Inicia o servidor
app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000');
});
