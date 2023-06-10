const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
module.exports = {
  login: async (req, res, next) => {
    const { email, password } = req.body;
    // Checar se o nome e a senha foram enviados.
    if (!email || !password) {
      return res.status(400).json({
        message: "O email ou a senha não foram enviados.",
      });
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(401).json({
          messsage: "O login não foi bem sucedido.",
          error: "Usuário não encontrado.",
        });
      } else {
        bcrypt.compare(password, user.password).then(function (result) {
          result
            ? res.status(200).json({
                message: "O login foi bem sucedido",
                user,
              })
            : res.status(400).json({ message: "O Login não funciona" });
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "Um erro aconteceu.",
        error: error.message,
      });
    }
  },
  register: async (res, req, next) => {
    const { username, email, password } = req.body;

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "A senha tem menos do que 8 caracteres." });
    }

    try {
      bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
          username,
          email,
          hash,
        }).then((user) =>
          res.status(200).json({
            message: "O usuário foi criado com sucesso!",
            user,
          })
        );
      });
    } catch (error) {
      res.status(401).json({
        message: "O usuário não foi criado com sucesso.",
        error: error.message,
      });
    }
  },
};
