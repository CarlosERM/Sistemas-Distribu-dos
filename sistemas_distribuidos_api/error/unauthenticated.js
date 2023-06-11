const CustomError = require("./custom_error");
const { StatusCodes } = require("http-status-codes");

class Unauthenticated extends CustomError {
  constructor(message) {
    super(message);
    this.status = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = Unauthenticated;
