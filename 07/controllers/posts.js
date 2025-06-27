const models = require("../models");

const createPost = async (req, res) => {
  console.log(req.body);
  const { title, content } = req.body;
  let filename = req.file ? req.file.filename : null; // filename aa-123444.png
  filename = `/downloads/${filename}`;

  // let user = await models.User.findOne({
  //   where: { email: "a@example.com" },
  // });
  // if (!user) {
  //   user = await models.User.create({
  //     name: "이지훈",
  //     email: "a@example.com",
  //     password: "12345678",
  //   });
  // }

  let attachments = [];
  if (req.file) {
    // single file
    attachments.push({
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
    });
  } else if (req.files && req.files.length > 0) {
    // multiple file
    attachments = req.files.map((file) => ({
      filename: file.filename,
      originalname: file.originalname,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype,
    }));
  }

  const post = await models.Post.create({
    title: title,
    content: content,
    authorId: req.user.id,
    // fileName: filename,
    attachments: attachments,
  });
  res.status(201).json({ message: "ok", data: post });
};

const findPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10; // limit
  const offset = (page - 1) * pageSize;

  const totalPosts = await models.Post.count();

  const posts = await models.Post.findAll({
    limit: pageSize,
    offset: offset,
  });
  const totalPages = Math.ceil(totalPosts / pageSize);

  res.status(200).json({
    message: "ok",
    data: {
      posts: posts,
      pagination: {
        currentPage: page,
        pageSize,
        totalItems: totalPosts,
        totalPages,
      },
    },
  });
};

const findPost = async (req, res) => {
  const id = req.params.id;
  const post = await models.Post.findByPk(id);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  res.status(200).json({ message: "ok", data: post });
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  const post = await models.Post.findByPk(id);
  if (post) {
    if (title) post.title = title;
    if (content) post.content = content;
    await post.save();
    res.status(200).json({ message: "ok", data: post });
  } else {
    res.status(404).json({ message: "post not found" });
  }
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const result = await models.Post.destroy({
    where: {
      id: id,
    },
  });
  if (result > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "post not found" });
  }
};

const createComment = async (req, res) => {
  const postId = req.params.postId;
  const { content } = req.body;
  // 1. 게시물이 존재여부 체크
  const post = await models.Post.findByPk(postId);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  // 1.5 사용자 추가
  let user = await models.User.findOne({
    where: { email: "b@example.com" },
  });
  if (!user) {
    user = await models.User.create({
      name: "뉴진스",
      email: "b@example.com",
      password: "12345678",
    });
  }
  // 2. comment 추가
  const comment = await models.Comment.create({
    content: content,
    postId: postId,
    userId: user.id,
  });
  res.status(201).json({ message: "ok", data: comment });
};

const findComments = async (req, res) => {
  const postId = req.params.postId;

  const comments = await models.Comment.findAll({
    where: { postId: postId },
    include: [
      { model: models.User, as: "author", attributes: ["id", "name", "email"] },
    ],
    order: [["createdAt", "DESC"]],
  });
  res.status(200).json({ message: "ok", data: comments });
};

const updateComment = async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;
  const { content } = req.body;

  // 1. 게시물이 있는지 확인
  const post = await models.Post.findByPk(postId);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }
  // 2. 댓글을 가지고 오기
  const comment = await models.Comment.findOne({
    where: {
      id: commentId,
      postId: postId,
    },
  });
  if (!comment) {
    return res.status(404).json({ message: "commment not found" });
  }
  // 3. 댓글 수정 및 저장
  if (content) comment.content = content;
  await comment.save();
  res.status(200).json({ message: "ok", data: comment });
};

const deleteComment = async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;

  // 1. 게시물 존재확인
  const post = await models.Post.findByPk(postId);
  console.log(post);
  if (!post) {
    return res.status(404).json({ message: " post not found" });
  }
  // 2. 댓글 삭제
  const result = await models.Comment.destroy({
    where: {
      id: commentId,
      postId: postId,
    },
  });
  if (result > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "comment not found" });
  }
};

module.exports = {
  createPost,
  findPosts,
  findPost,
  updatePost,
  deletePost,
  createComment,
  findComments,
  updateComment,
  deleteComment,
};
