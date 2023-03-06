const bookModel = require("../models/book.model");

module.exports = {
  getAllBooks: async (req, res) => {
    try {
      const book = await bookModel.find();
      res.status(200).json(book);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  addBook: async (req, res) => {
    try {
      const book = await bookModel.create(req.body);
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getBook: async (req, res) => {
    try {
      const { id } = req.params;

      const book = await bookModel.findOne({ _id: id });

      if (!book) {
        return res.status(404).json({
          msg: `Nenhum livro com o id ${id} foi encontrado.`,
        });
      }

      res.status(200).json(book);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateBook: async (req, res) => {
    try {
      const { id } = req.params;

      const book = await bookModel.findOneAndUpdate({ _id: id }, req.body);

      if (!book) {
        return res.status(404).json({
          msg: `Nenhum livro com o id ${id} foi encontrado.`,
        });
      }

      res.status(200).json(book);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteBook: async (req, res) => {
    try {
      const { id } = req.params;

      const book = await bookModel.findOneAndDelete({ _id: id });

      if (!book) {
        return res.status(404).json({
          msg: `Nenhum livro com o id ${id} foi encontrado.`,
        });
      }
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
