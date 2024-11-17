const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const validateBook = require('../middlewares/validateBook');

// GET all books

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch(error) {
        res.status(500).json({message:error});
    }
})

// GET some book by ID

router.get('/', async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId);
        if(!book) return res.status(404).json({message: 'Book not found'});
        res.status(200).json(book);
    } catch(errror) {  
        res.status(500).json({message:error});
    }
})

// Post
router.post('/', validateBook, async (req, res) => {
  const book = new Book(req.body);
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Put
router.put('/:id', validateBook, async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /books/:id: Eliminar un libro por ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;