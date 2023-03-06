require("dotenv").config();
require("colors");

const express = require("express");
const app = express();

const booksRouter = require("./routes/books.route");
const authorsRouter = require("./routes/authors.route");
const employeesRouter = require("./routes/employees.route");

const connectDB = require("./config/db");

app.use(express.json());
app.use("/ap1/v1/bookstore/book", booksRouter);
app.use("/ap1/v1/bookstore/author", authorsRouter);
app.use("/ap1/v1/bookstore/employee", employeesRouter);

app.set("PORT", process.env.BOOKSTORE_PORT);

const start = async () => {
  try {
    await connectDB(process.env.ME_CONFIG_MONGODB_URL);
    app.listen(app.get("PORT"), () => {
      console.log(`O servidor está rodando na porta ${app.get("PORT")}`.green);
    });
  } catch (error) {
    console.log(`${error}`.red);
  }
};

start();
