const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  senha: String,
  primeiro_nome: String,
  ultimo_nome: String,
});

module.exports = mongoose.model("User", userSchema);
