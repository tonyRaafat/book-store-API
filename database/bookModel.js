import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const BookModel = new Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
        publishedDate: { type: Date, default: Date.now }
    }
)

export const Book = model('Book', BookModel)