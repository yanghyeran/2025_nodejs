//여기에 note 앱 restful api 를 만들어주세요
const express = require("express");
const models = require("./models");
// requre("./models/index.js")
// models 에는 index.js 맨 하단에 있는 db 변수가 할당이됩니다.
// models.Todo models.Post
const app = express();
const PORT = 3000;
app.use(express.json());

// POST /notes : 노트 입력
app.post("/notes", async (req, res) => {
  const { title, content, tag } = req.body;
  const note = await models.Note.create({
    title: title,
    content: content,
    tag: tag,
  });
  res.status(201).json({ message: "ok", data: note });
});
// GET  /notes : 노트 목록조회
app.get("/notes", async (req, res) => {
  const notes = await models.Note.findAll();
  res.status(201).json({ message: "ok", data: notes });
});
// GET  /notes/:tag : 태그로 노트 목록 조회
app.get("/notes/:tag", async (req, res) => {
  const tag = req.params.tag;
  const notes = await models.Note.findAll({
    where: {
      tag: tag,
    },
  });
  res.status(200).json({ message: "ok", data: notes });
});
// PUT  /notes/:id : id 로 노트 수정
app.put("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { title, content, tag } = req.body;
  const note = await models.Note.findByPk(id);
  if (note) {
    if (title) note.title = title;
    if (content) note.content = content;
    if (tag) note.tag = tag;
    await note.save();
    res.status(200).json({ message: "ok", data: note });
  } else {
    res.status(404).json({ message: "not found note" });
  }
});
// DELETE /notes/:id :id 로 노트 삭제
app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const result = await models.Note.destroy({ where: { id: id } });
  if (result > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "note not found" });
  }
});

app.listen(PORT, () => {
  console.log(`server is listening on ${PORT}`);
  models.sequelize
    .sync({ force: false })
    .then(() => {
      console.log("DB connected");
    })
    .catch(() => {
      console.error("DB error");
      process.exit();
    });
});
