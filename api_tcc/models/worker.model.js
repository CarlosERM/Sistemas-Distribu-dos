const mongoose = require("mongoose");

const workerSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "O nome do trabalhador não foi adicionado."],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "O trabalhador precisar ter uma data de nascimento."],
  },
  gender: {
    type: String,
    required: [true, "O trabalhador precisa ter um gênero."],
  },
});
