const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises; // Using promises for cleaner async/await usage
const Book = require('../models/Book');

const router = express.Router();
const uploadDir = path.join(__dirname, '../uploads');

// Configuração do multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdir(uploadDir, { recursive: true }) // Create directory if it doesn't exist
      .then(() => cb(null, uploadDir))
      .catch(err => cb(err));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Rotas
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar livros', error });
  }
});

router.post('/', upload.single('cover'), async (req, res) => {
    const {title, author, year } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'Por favor, envie uma imagem de capa' });
  }

  // Validation for empty title
  if (!title) {
    return res.status(400).json({ message: 'O campo "title" é obrigatório' });
  }

  const book = new Book({
    title,
    author,
    year,
    cover: req.file.filename,
  });

  try {
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao salvar o livro', error });
  }
});



//------------------------------------------------//
              //    PUT   //

// New PUT route for updating a book
router.put('/:id', upload.single('cover'), async (req, res) => {
  const { id } = req.params;
  const { title, author, year } = req.body;

  // Find the book by ID
  let book;
  try {
    book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar o livro', error });
  }

  // Update book data
  book.title = title; // Direct assignment of new title (regardless of previous value)
  book.author = author || book.author;
  book.year = year || book.year;

  // Update cover if a new file is uploaded
  if (req.file) {
    book.cover = req.file.filename;
  }

  // Save the updated book
  try {
    const updatedBook = await book.save();
    res.status(200).json(updatedBook); // Return the updated book object
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar o livro', error });
  }
});

// Rota DELETE para excluir um livro
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByIdAndDelete(id); // Exclui o livro pelo ID
    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado' });
    }

    res.status(200).json({ message: 'Livro excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir o livro', error });
  }
});

module.exports = router;