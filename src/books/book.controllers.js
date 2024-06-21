import { Author } from '../../database/authorModel.js';
import {Book} from '../../database/bookModel.js';

export const createBook = async (req, res) => {
    try {
        const booksData = req.body;
        
        const books = await Book.insertMany(booksData);

        for (let book of books) {
            await Author.findByIdAndUpdate(
                book.author,
                { $push: { books: book._id } },
                { new: true, runValidators: true }
            );
        }
        res.status(201).send(books);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getAllBooks = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        const books = await Book.find({ title: new RegExp(search, 'i') })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Book.countDocuments({ title: new RegExp(search, 'i') });

        res.json({
            books,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).send();
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!book) return res.status(404).send();
        res.send(book);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).send();
        res.send(book);
    } catch (error) {
        res.status(500).send(error);
    }
};