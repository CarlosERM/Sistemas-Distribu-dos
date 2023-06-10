const asyncWrapper = require("../middleware/asyncWrapper");
module.exports = {
  createWorker: asyncWrapper((req, res, next) => {}),
  getAllWorkers: asyncWrapper((req, res, next) => {}),
  getWorker: asyncWrapper((req, res, next) => {}),
  updateWorker: asyncWrapper((req, res, next) => {}),
  deleteWorker: asyncWrapper((req, res, next) => {}),
};
