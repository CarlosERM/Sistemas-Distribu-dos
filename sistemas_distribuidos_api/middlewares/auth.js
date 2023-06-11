require("dotenv").config();
const jwt = require("jsonwebtoken");
const BadRequest = require("../error/bad_request");
const Unauthenticated = require("../error/unauthenticated");
const asyncWrapper = require("./async_wrapper");
const auth = asyncWrapper(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new BadRequest("Nenhum token foi fornecido.");
  }
  const token = authHeader.split(" ")[1];
  try {
    console.log(process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.SECRET_JWT);
    const { email } = decoded;
    req.user = { email };
    next();
  } catch (error) {
    throw new Unauthenticated("Você não foi autorizado a acessar essa rota.");
  }
});

module.exports = auth;
