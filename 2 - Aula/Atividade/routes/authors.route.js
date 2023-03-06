const express = require("express");
const authorsRouter = express.Router();
const authorsController = require("../controllers/authors.controller");

authorsRouter
  .route("/")
  .get(authorsController.getAllAuthors)
  .post(authorsController.addAuthor);

authorsRouter
  .route("/:id")
  .get(authorsController.getAuthor)
  .put(authorsController.updateAuthor)
  .delete(authorsController.deleteAuthor);

module.exports = authorsRouter;
