const { StatusCodes } = require("http-status-codes");
const CustomError = require("../error/custom_error");
const errorHandler = (error, req, res, next) => {
  if (error instanceof CustomError) {
    return res.status(error.status).json({ msg: error.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "Algo desconhecido aconteceu." });
};

module.exports = errorHandler;
