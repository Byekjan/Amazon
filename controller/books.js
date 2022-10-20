const Book = require("../models/Book");
const Category = require("../models/Category");
const MyError = require("../utils/myError");
const asyncHandler = require("express-async-handler");

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

exports.getBook = asyncHandler( async (req, res, next) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        throw new MyError(req.params.id + " data not found", 400);
    }

    const avg = await Book.computeCategoryAveragePrice(book.category);

    res.status(200).json({
        success: true,
        id: `get book id -> ${req.params.id}`,
        data: book,
        avgPrice: avg
    });
});

exports.createBook = asyncHandler( async (req, res, next) => {
    const category = await Category.findById(req.body.category);
    if (!category) {
        throw new MyError(req.body.category + " category not found", 400);
    }
    
    const book = await Book.create(req.body);

    res.status(200).json({
        success: true,
        id: `get book id -> ${req.body.id}`,
        data: book
    });
});

exports.updateBook = asyncHandler( async (req, res, next) => {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true, //oorchlogdson medeeleliig butsaj uguh
        // it accepts model validator too when update
        runValidators: true
    });
    res.status(200).json({
        success: true,
        data: book
    });
});

exports.deleteBook = asyncHandler( async (req, res, next) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        throw new MyError(req.params.id + " book  not found", 400);
    }

    book.remove();

    res.status(200).json({
        success: true,
        data: book
    });
});