const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema({
  titulo: String,
  autor: String,
  descricao: String,
  data: { type: Date, default: Date.now },
  paginas: Number,
});

module.exports = mongoose.model("Book", bookSchema);
