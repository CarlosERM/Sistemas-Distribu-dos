const { StatusCodes } = require("http-status-codes");
const notFound = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send("Essa rota não existe");
};
module.exports = notFound;
