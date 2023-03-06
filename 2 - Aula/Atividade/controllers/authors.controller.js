const authorModel = require("../models/author.model");

module.exports = {
  getAllAuthors: async (req, res) => {
    try {
      const author = await authorModel.find();
      res.status(200).json(author);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  addAuthor: async (req, res) => {
    try {
      const author = await authorModel.create(req.body);
      res.status(201).json(author);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAuthor: async (req, res) => {
    try {
      const { id } = req.params;

      const author = await authorModel.findOne({ _id: id });

      if (!author) {
        return res.status(404).json({
          msg: `Nenhum autor com o id ${id} foi encontrado.`,
        });
      }

      res.status(200).json(author);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateAuthor: async (req, res) => {
    try {
      const { id } = req.params;

      const author = await authorModel.findOneAndUpdate({ _id: id }, req.body);

      if (!author) {
        return res.status(404).json({
          msg: `Nenhum autor com o id ${id} foi encontrado.`,
        });
      }

      res.status(200).json(author);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteAuthor: async (req, res) => {
    try {
      const { id } = req.params;

      const author = await authorModel.findOneAndDelete({ _id: id });

      if (!author) {
        return res.status(404).json({
          msg: `Nenhum autor com o id ${id} foi encontrado.`,
        });
      }
      res.status(200).json(author);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
