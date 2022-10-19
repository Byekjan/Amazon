const express = require("express");
const booksRouter = require('./books');
const {
    getCategories, 
    getCategory, 
    createCategory, 
    updateCategory, 
    deleteCategory
} = require("../controller/categories");

const router = express.Router();
router.use('/:categoryId/books', booksRouter);
// const { getBooks } = require("../controller/books");
// router.route('/:categoryId/books').get(getBooks);

router.route('/').get(getCategories).post(createCategory);
router.route('/:id').get(getCategory).put(updateCategory).delete(deleteCategory);

module.exports = router;