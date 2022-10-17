const Book = require("../models/Book");

exports.getBooks = (req, res, next) => {
    res.status(200).json({
        success: true,
        data: 'get all books'
    });
}

exports.getBook = (req, res, next) => {
    res.status(200).json({
        success: true,
        data: 'get book'
    });
}

exports.createtBook = async (req, res, next) => {
    try {
        const book = await Book.create(req.body);
        res.status(200).json({
            success: true,
            // userID: req.userID,
            data: book
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err
        })
    }
    
}

exports.updateBook = (req, res, next) => {
    res.status(200).json({
        success: true,
        data: 'update book'
    });
}

exports.deleteBook = (req, res, next) => {
    res.status(200).json({
        success: true,
        data: 'update book'
    });
}