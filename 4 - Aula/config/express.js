require("colors");
require("dotenv").config();

const morgan = require("morgan");
const express = require("express");
const app = express();

const router = require("../routes/user.route");

app.set("PORT", process.env.TRABALHO_APP_PORT);

// MIDDLEWARES
app.use(express.json());
app.use("/", router);
if (process.env.NODE_ENV == "development") {
  app.use(morgan("tiny"));
}

module.exports = app;
