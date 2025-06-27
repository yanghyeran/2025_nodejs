// express + sequelize crud 를 제공하는 서버가 이 파일에 코딩될거에요
// todos restful api 서버가 코딩 될거에요
// 관련된 모듈 임포트 먼저
const express = require("express");
const models = require("./models");
const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/todos", async (req, res) => {
  const { task, description } = req.body;
  const todo = await models.Todo.create({
    task: task,
    description: description,
  });
  res.status(201).json({ message: "ok", data: todo });
});

app.get("/todos", async (req, res) => {
  const todos = await models.Todo.findAll();
  res.status(200).json({ message: "ok", data: todos });
});

app.get("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await models.Todo.findByPk(id);
  if (todo) {
    res.status(200).json({ message: "ok", data: todo });
  } else {
    res.status(404).json({ message: `할일을 찾을 수 없어요` });
  }
});

app.put("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const { task, description, completed, priority } = req.body;
  const todo = await models.Todo.findByPk(id);
  if (todo) {
    if (task) todo.task = task;
    if (description) todo.description = description;
    if (completed) todo.completed = completed;
    if (priority) todo.priority = priority;
    await todo.save();
    res.status(200).json({ message: "ok", data: todo });
  } else {
    res.status(404).json({ message: "할일이 없어" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const result = await models.Todo.destroy({
    where: { id: id },
  });
  console.log(result); // result 숫자이고 지운 행의 갯수
  if (result > 0) {
    res.status(200).json({ message: "삭제가 성공했어용" });
  } else {
    res.status(404).json({ message: "할일 없어용" });
  }
});

app.listen(PORT, () => {
  console.log(`Todo 서버거 http://localhost:${PORT} 에서 실행중`);
  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("db connected");
    })
    .catch(() => {
      console.log("db error");
      process.exit();
    });
});
