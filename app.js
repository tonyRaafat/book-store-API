import express from 'express'
import bookRoutes from './src/books/book.router.js'
import authorRoutes from './src/authors/author.routers.js'
import errorHandler from './utils/errorHandler.utils.js'
import mongoose from './database/dbConnection.js'
const app = express()
const port = 3000

app.use(express.json())

app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);

app.all('*', (req, res, next) => {
    const error = new Error(`Cannot ${req.method} ${req.originalUrl}`)
    error.statusCode = 404
    next(error)
})

app.use(errorHandler)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))