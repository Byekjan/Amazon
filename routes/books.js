const express = require('express');
const {
    getBooks,
    getBook,
    createtBook,
    updateBook,
    deleteBook
} = require('../controller/books');
const router = express.Router();

router.route('/').get(getBooks).post(createtBook);
router.route('/:id').get(getBook).put(updateBook).delete(deleteBook);

module.exports = router;