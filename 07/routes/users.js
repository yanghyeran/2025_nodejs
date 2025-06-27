const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

//http://localhost:3000/todos/
router.post("/", userController.createUser);
router.get("/", userController.findAll);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
