const asyncWrapper = require("../../middlewares/async_wrapper");
const Book = require("./book.model");
const { StatusCodes } = require("http-status-codes");
const BadRequest = require("../../error/bad_request");

module.exports = {
  registerBook: asyncWrapper(async (req, res) => {
    const { titulo, autor, descricao, data, paginas } = req.body;

    if (!titulo || !autor || !descricao || !data || !paginas) {
      throw new BadRequest(
        "Por favor forneça todos os campos necessários para cadastrar um livro."
      );
    }
    const match = await Book.find({
      titulo,
      autor,
    });
    if (match.length != 0) {
      throw new BadRequest(`${titulo} já foi cadastrado no sistema!`);
    }

    const book = await Book.create({
      titulo,
      autor,
      descricao,
      data: new Date(data),
      paginas,
    });
    res.status(StatusCodes.CREATED).json({ book });
  }),
  getAllBooks: asyncWrapper(async (req, res) => {
    const { titulo, autor, sort, fields } = req.query;
    let query = {};

    if (titulo) {
      query.titulo = { $regex: titulo, $options: "i" };
    }
    if (autor) {
      query.autor = { $regex: autor, $options: "i" };
    }

    let result = Book.find(query);

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

    const books = await result;
    res.status(StatusCodes.OK).json({ books });
  }),
  updateBook: asyncWrapper(async (req, res) => {
    const { id: bookID } = req.params;
    const book = await Book.findOneAndUpdate({ _id: bookID }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      throw new BadRequest(`Nenhum livro com o id ${bookID} foi encontrado.`);
    }
    res.status(StatusCodes.OK).json({ book });
  }),
  deleteBook: asyncWrapper(async (req, res) => {
    const { id: bookID } = req.params;
    const book = await Book.findOneAndDelete({ _id: bookID });

    if (!book) {
      return next(BadRequest(`Nenhum com o id ${bookID} item foi encontrado.`));
    }
    return res.status(StatusCodes.OK).json({
      book,
    });
  }),
};
