require("dotenv").config();
require("colors");
const express = require("express");
const app = express();
const morgan = require("morgan");
const { PORT, NODE_ENV } = process.env;
const bookRoutes = require("../components/book/book.route");
const userRoutes = require("../components/user/user.route");
const auth = require("../middlewares/auth");
const notFound = require("../middlewares/not_found");
const errorHandler = require("../middlewares/error_handler");

// Middlewares.
app.use(express.json());
if (NODE_ENV == "desenvolvimento") {
  app.use(morgan("tiny"));
}
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/books", auth, bookRoutes);
app.use(notFound);
app.use(errorHandler);

// Variáveis
app.set("PORT", PORT);

module.exports = app;
