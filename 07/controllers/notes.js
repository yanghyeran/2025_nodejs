const models = require("../models");

exports.createNotes = async (req, res) => {
  const { title, content, tag } = req.body;
  const note = await models.Note.create({
    title: title,
    content: content,
    tag: tag,
  });
  res.status(201).json({ message: "ok", data: note });
};

exports.getAllNotes = async (req, res) => {
  const notes = await models.Note.findAll();
  res.status(201).json({ message: "ok", data: notes });
};

exports.getNotes = async (req, res) => {
  const tag = req.params.tag;
  const notes = await models.Note.findAll({
    where: {
      tag: tag,
    },
  });
  res.status(200).json({ message: "ok", data: notes });
};

exports.updateNote = async (req, res) => {
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
};

exports.deleteNote = async (req, res) => {
  const id = req.params.id;
  const result = await models.Note.destroy({ where: { id: id } });
  if (result > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "note not found" });
  }
};
