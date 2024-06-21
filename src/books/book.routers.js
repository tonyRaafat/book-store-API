import { Router } from 'express';
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from './books.controller.js';
const router = Router();

router.post('/', createBook);
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router