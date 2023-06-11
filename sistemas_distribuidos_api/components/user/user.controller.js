require("dotenv").config();
const asyncWrapper = require("../../middlewares/async_wrapper");
const User = require("./user.model");
var jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
var bcrypt = require("bcryptjs");
const BadRequest = require("../../error/bad_request");

module.exports = {
  registerUser: asyncWrapper(async (req, res) => {
    const { email, senha, primeiro_nome, ultimo_nome } = req.body;

    if (!email || !senha || !primeiro_nome || !ultimo_nome) {
      throw new BadRequest(
        "Por favor forneça todos os campos necessários para fazer o cadastro de um usuário."
      );
    }
    const match = await User.find({
      email,
    });

    if (match.length != 0) {
      throw new BadRequest(`${email} já foi cadastrado no sistema!`);
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(senha, salt, async function (err, senhaHash) {
        const user = await User.create({
          email,
          senha: senhaHash,
          primeiro_nome,
          ultimo_nome,
        });

        const token = await jwt.sign(
          {
            email,
          },
          process.env.SECRET_JWT,
          { expiresIn: "1h" }
        );

        res.status(StatusCodes.CREATED).json({ user, token });
      });
    });
  }),
  loginUser: asyncWrapper(async (req, res) => {
    const { email, senha } = req.body;
    if (!email || !senha) {
      throw new BadRequest(
        "Por favor forneça todos os campos necessários para fazer o login de um usuário."
      );
    }
    const user = await User.findOne({
      email,
    });
    if (!user) {
      throw new BadRequest(`${email} não está cadastrado no sistema!`);
    }
    bcrypt.compare(senha, user.senha, async function (err, result) {
      if (result) {
        const token = await jwt.sign(
          {
            email,
          },
          process.env.SECRET_JWT,
          { expiresIn: "1h" }
        );
        res.status(StatusCodes.OK).json({ user, token });
      } else {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "Email ou senha estão incoretos." });
      }
    });
  }),
};
