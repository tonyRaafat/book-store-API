import {Author} from '../../database/authorModel.js';

export const createAuthor = async (req, res) => {
    try {
        const author = new Author(req.body);
        await author.save();
        res.status(201).send(author);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const getAllAuthors = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;
        const authors = await Author.find({ name: new RegExp(search, 'i') })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Author.countDocuments({ name: new RegExp(search, 'i') });

        res.json({
            authors,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id).populate('books');
        if (!author) return res.status(404).send();
        res.send(author);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateAuthor = async (req, res) => {
    try {
        const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!author) return res.status(404).send();
        res.send(author);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const deleteAuthor = async (req, res) => {
    try {
        const author = await Author.findByIdAndDelete(req.params.id);
        if (!author) return res.status(404).send();
        res.send(author);
    } catch (error) {
        res.status(500).send(error);
    }
};
