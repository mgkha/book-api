const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: 'Anonymous'
    },
    filename: {
        type: String,
        required: true
    },
    cover: {
        type: String
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;