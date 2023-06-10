require("dotenv").config();
require("colors");
const express = require("express");
const app = express();
const morgan = require("morgan");

app.set("PORT", process.env.API_TCC_PORT);

app.use(morgan("tiny"));
app.use(express.json());

module.exports = app;
