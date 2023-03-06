const express = require("express");
const employeesRouter = express.Router();
const employeesController = require("../controllers/employees.controller");

employeesRouter
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(employeesController.addEmployee);

employeesRouter
  .route("/:id")
  .get(employeesController.getEmployee)
  .put(employeesController.updateEmployee)
  .delete(employeesController.deleteEmployee);

module.exports = employeesRouter;
