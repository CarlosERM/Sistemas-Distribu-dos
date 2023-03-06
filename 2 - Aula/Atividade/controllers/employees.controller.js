const employeeModel = require("../models/employee.model");

module.exports = {
  getAllEmployees: async (req, res) => {
    try {
      const employee = await employeeModel.find();
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  addEmployee: async (req, res) => {
    try {
      const employee = await employeeModel.create(req.body);
      res.status(201).json(employee);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getEmployee: async (req, res) => {
    try {
      const { id } = req.params;

      const employee = await employeeModel.findOne({ _id: id });

      if (!employee) {
        return res.status(404).json({
          msg: `Nenhum funcionário com o id ${id} foi encontrado.`,
        });
      }

      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateEmployee: async (req, res) => {
    try {
      const { id } = req.params;

      const employee = await employeeModel.findOneAndUpdate(
        { _id: id },
        req.body
      );

      if (!employee) {
        return res.status(404).json({
          msg: `Nenhum funcionário com o id ${id} foi encontrado.`,
        });
      }

      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteEmployee: async (req, res) => {
    try {
      const { id } = req.params;

      const employee = await employeeModel.findOneAndDelete({ _id: id });

      if (!employee) {
        return res.status(404).json({
          msg: `Nenhum funcionário com o id ${id} foi encontrado.`,
        });
      }
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
