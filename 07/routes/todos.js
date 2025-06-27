const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todos");

//http://localhost:3000/todos/
router.post("/", todoController.createTodos);
router.get("/", todoController.getAllTodos);
router.get("/:id", todoController.getTodos);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
