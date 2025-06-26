const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');

const author = require('../controllers/author');

router.route('/')
.get(catchAsync(author.getAllAuthor))
.post(author.createAuthor);

router.route('/:id')
.get(catchAsync(author.getIndividualAuthor))
.put(catchAsync(author.updateAuthor))
.delete(catchAsync(author.deleteAuthor));

module.exports = router;

