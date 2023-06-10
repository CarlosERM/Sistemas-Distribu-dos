const userModel = require("../models/user.model");

module.exports = {
  getAllUsers: (req, res) => {
    console.log("Pegar todos os usuários.");
  },
  getUser: (req, res) => {
    console.log("Pegar usuário.");
  },
  createUser: (req, res) => {
    console.log(req.body);
    console.log("vaise foder");
  },
  updateUser: (req, res) => {
    console.log("Atualizar usuário.");
  },
  deleteUser: (req, res) => {
    console.log("Deletar usuário.");
  },
};
