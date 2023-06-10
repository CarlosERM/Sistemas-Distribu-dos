const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    unique: true,
    type: String,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  }
});

module.exports = mongoose.model("User", userSchema);
