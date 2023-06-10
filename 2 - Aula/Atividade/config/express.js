require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();

const booksRouter = require("../routes/books.route");
const authorsRouter = require("../routes/authors.route");
const employeesRouter = require("../routes/employees.route");

// Middlewares
app.use(express.json());
app.use(cors());

// Routes.
app.use("/ap1/v1/bookstore/book", booksRouter);
app.use("/ap1/v1/bookstore/author", authorsRouter);
app.use("/ap1/v1/bookstore/employee", employeesRouter);

// PORT
app.set("PORT", process.env.BOOKSTORE_PORT);

module.exports = app;
