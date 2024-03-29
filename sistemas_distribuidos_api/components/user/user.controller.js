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
  updateUser: asyncWrapper(async (req, res) => {
    const { email, senha, primeiro_nome, ultimo_nome } = req.body;
    const { email: currentEmail } = req.user;
    const match = await User.find({
      email,
    });
    if (!currentEmail) {
      throw new BadRequest(`O email é nulo!`);
    }
    if (match.length != 0) {
      throw new BadRequest(`${email} já foi cadastrado no sistema!`);
    }

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(senha, salt, async function (err, senhaHash) {
        const user = await User.findOneAndUpdate(
          { email: currentEmail },
          {
            email,
            senha: senhaHash,
            primeiro_nome,
            ultimo_nome,
          },
          {
            new: true,
          }
        );

        const token = await jwt.sign(
          {
            email: user.email,
          },
          process.env.SECRET_JWT,
          { expiresIn: "1h" }
        );
        res.status(StatusCodes.OK).json({ user, token });
      });
    });
  }),
  getAllUsers: asyncWrapper(async (req, res) => {
    const { primeiro_nome, email, sort, fields } = req.query;
    let query = {};

    if (primeiro_nome) {
      query.primeiro_nome = { $regex: primeiro_nome, $options: "i" };
    }
    if (email) {
      query.email = { $regex: autemailor, $options: "i" };
    }

    let result = User.find(query);

    if (sort) {
      const sortList = sort.split(",").join(" ");
      result = result.sort(sortList);
    } else {
      result = result.sort("createdAt");
    }

    if (fields) {
      const fieldsList = fields.split(",").join(" ");
      result = result.select(fieldsList);
    }

    // Páginas: 10, limite: 10. Skip: Quantas serão ignoradas.
    // Page 2, skip page - 1 = 0 * 10.
    const page = Number(req.query.page) || 1; // 2
    const limit = Number(req.query.limit) || 10; // 10
    const skip = (page - 1) * limit; // Skip 10 itens da primeira página.

    result = result.skip(skip).limit(limit);

    const users = await result;
    res.status(StatusCodes.OK).json({ users });
  }),
  deleteUser: asyncWrapper(async (req, res) => {
    const { email } = req.user;
    const user = await User.findOneAndDelete({ email });

    if (!user) {
      throw new BadRequest(`O ${email} não foi encontrado.`);
    }
    return res.status(StatusCodes.OK).json({
      user,
    });
  }),
};
