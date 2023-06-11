const express = require("express");
const router = express.Router();
const UserController = require("./user.controller");
const auth = require("../../middlewares/auth");

router.route("/register").post(UserController.registerUser);
router.route("/login").post(UserController.loginUser);
router
  .route("/")
  .patch(auth, UserController.updateUser)
  .delete(auth, UserController.deleteUser);
router.route("/all").get(auth, UserController.getAllUsers);

module.exports = router;
