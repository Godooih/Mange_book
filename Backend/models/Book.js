const mongoose = require('mongoose');

// Define a estrutura para salvar o livro no banco de dados
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
  },
  cover: {
    type: String,  // Campo para armazenar o caminho da imagem
  },
});

// Exportando o modelo para salvar os livros
module.exports = mongoose.model('Book', BookSchema);
