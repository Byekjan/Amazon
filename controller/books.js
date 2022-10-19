const Book = require("../models/Book");
const MyError = require("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");

exports.getBooks = asyncHandler(async (req, res, next) => {
    let query;
    if(req.params.categoryId) {
        query = Book.find({category: req.params.categoryId});
    } else {
        query = Book.find().populate({
            path: 'category',
            select: 'name averagePrice'
        });
    }
    const books = await query;
    res.status(200).json({
        success: true,
        count: books.length,
        data: books
    });
});

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