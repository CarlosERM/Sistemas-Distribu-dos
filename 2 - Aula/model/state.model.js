const mongoose = require("mongoose");

const stateSchema = mongoose.Schema({
  states: {
    type: String,
    required: [true, "É necessário fornecer um state."],
    trim: true,
    maxlength: [20, "O nome não pode ter mais do que 20 caracteres."],
  },
});

module.exports = mongoose.mongoose.model("State", stateSchema);
