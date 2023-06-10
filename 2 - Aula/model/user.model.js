const mongoose = require("mongoose");

const userSchema = mongoose.Model({
  name: {
    type: String,
  },
});

module.exports = userSchema;
