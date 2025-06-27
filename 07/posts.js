// POST/COMMENT 전용 REST ENDPOINT
const express = require("express");
const models = require("./models");

//멀터 임포트
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;
app.use(express.json());

// 멀터 formdata, multi part forma 데이터를 받기 위한 미들웨어 설정
app.use(express.urlencoded({ extended: true }));
const uploadDir = `public/uploads`;
app.use(`/downloads`, express.static(path.join(__dirname, uploadDir)));
// http://localhost:3000/downloads/aa.png

// 멀터 저장소 설정
const storage = multer.diskStorage({
  destination: `./${uploadDir}`, // 요 파일이 있는 디렉토리 하위로 uploadDir 만들어주세요
  filename: function (req, file, cb) {
    // (file.originlname).name : aa
    // -
    // 1781029281
    // .png
    // fname = aa-1781029281.png
    const fname =
      path.parse(file.originalname).name +
      "-" +
      Date.now() +
      path.extname(file.originalname);
    cb(
      null, // Error
      fname
    );
  },
});

const upload = multer({ storage: storage });

// route add
app.post("/posts", upload.single("file"), async (req, res) => {
  const { title, content } = req.body;
  let filename = req.file ? req.file.filename : null; //멀터 추가
  filename = `/downloads/${filename}`; //멀터 추가

  // 원래는 jwt 토근에서 사용자 ID를 받아와서 넣어줘야 하지만
  // 아직 안배워서 사용자를 생성하고 그다음에 게시글을 넣겠습니다.
  let user = await models.User.findOne({
    where: { email: "a@example.com" },
  });
  if (!user) {
    user = await models.User.create({
      name: "양혜란",
      email: "a@example.com",
      password: "12345678",
    });
  }

  const post = await models.Post.create({
    title: title,
    content: content,
    authorId: user.id,
    fileName: filename, //멀터 추가
  });
  res.status(201).json({ message: "ok", data: post });
});

// 전체 목록
app.get("/posts", async (req, res) => {
  const posts = await models.Post.findAll();
  res.status(200).json({ message: "ok", data: posts });
});
// 1개 목록
app.get("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const post = await models.Post.findByPk(id);
  if (post) {
    res.status(200).json({ message: "ok", data: post });
  } else {
    res.status(404).json({ message: `찾을 수 없어요` });
  }
});
//게시글 수정
app.put("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const { title, content, email, password } = req.body;
  const post = await models.Post.findByPk(id);
  if (post) {
    if (title) post.title = title;
    if (content) post.content = content;
    if (email) post.email = email;
    if (password) post.password = password;
    await post.save();
    res.status(200).json({ message: "ok", data: post });
  } else {
    res.status(404).json({ message: " 없어" });
  }
});
//게시글 삭제
app.delete("/posts/:id", async (req, res) => {
  const id = req.params.id;
  const result = await models.Post.destroy({
    where: { id: id },
  });
  console.log(result); // result 숫자이고 지운 행의 갯수
  if (result > 0) {
    res.status(200).json({ message: "삭제가 성공 했어용" });
  } else {
    res.status(404).json({ message: " 없어용" });
  }
});

// 댓글 관련된 코드
// 댓글 추가
app.post("/posts/:postId/comments", async (req, res) => {
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
      name: "스승님",
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
});

//댓글 목록 가져오기

app.get("/posts/:postId/comments", async (req, res) => {
  const postId = req.params.postId;

  const comments = await models.Comment.findAll({
    where: { postId: postId },
    include: [
      { model: models.User, as: "author", attributes: ["id", "name", "email"] },
    ],
    order: [["createdAt", "DESC"]],
  });
  res.status(200).json({ message: "ok", data: comments });
});

// 댓글 수정
app.put("/posts/:postId/comments/:id", async (req, res) => {
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
});

// 댓글 삭제
app.delete("/posts/:postId/comments/:id", async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.id;

  // 1. 게시물 존재확인
  const post = await models.Post.findByPk(postId);
  console.log(post);

  if (!post || post < 1) {
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
    res.status(200).json({ message: "comment delete ok" });
  } else {
    res.status(404).json({ message: "comment not found" });
  }
});

// add route
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
