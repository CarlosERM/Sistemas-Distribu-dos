const express = require("express");
const router = express.Router();
const BookController = require("./book.controller");
router
  .route("/")
  .get(BookController.getAllBooks)
  .post(BookController.registerBook);
router
  .route("/:id")
  .patch(BookController.updateBook)
  .delete(BookController.deleteBook);

module.exports = router;
