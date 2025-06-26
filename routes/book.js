const express = require('express')
const router = express.Router({ mergeParams: true });

const catchAsync = require('../utils/catchAsync')

const book = require('../controllers/book')

router.route('/')
.post(catchAsync(book.createBook))

router.route('/:bookid')
.get(catchAsync(book.getBook))
.put(catchAsync(book.updateBook))
.delete(catchAsync(book.deleteBook))

module.exports = router;