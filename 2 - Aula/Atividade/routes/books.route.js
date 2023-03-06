const express = require("express");
const booksRouter = express.Router();
const booksController = require("../controllers/books.controller");

booksRouter
  .route("/")
  .get(booksController.getAllBooks)
  .post(booksController.addBook);

booksRouter
  .route("/:id")
  .get(booksController.getBook)
  .put(booksController.updateBook)
  .delete(booksController.deleteBook);

module.exports = booksRouter;
