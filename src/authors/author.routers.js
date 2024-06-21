import { Router } from 'express';
import { createAuthor, deleteAuthor, getAllAuthors, getAuthorById, updateAuthor } from './author.controllers.js';
const router = Router();

router.post('/', createAuthor);
router.get('/', getAllAuthors);
router.get('/:id', getAuthorById);
router.put('/:id', updateAuthor);
router.delete('/:id', deleteAuthor);

export default router