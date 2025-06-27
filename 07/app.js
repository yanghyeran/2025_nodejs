const path = require("path");
const express = require("express");
const noteRouter = require("./routes/notes");
const todoRouter = require("./routes/todos");
const postRouter = require("./routes/posts");
const userRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const models = require("./models");
const app = express();
const { logger, logging } = require("./middlewares/logger");
// 미들웨어  설정
app.use(logging); // 로깅 미들웨어
app.use(express.json()); // json 파싱 미들웨어
app.use(express.urlencoded({ extended: true }));
const uploadDir = `public/uploads`;
app.use(`/downloads`, express.static(path.join(__dirname, uploadDir)));

// notes url 로 들어오는 주소는 전부 noteRouter 처리
app.use("/notes", noteRouter);
app.use("/todos", todoRouter);
app.use("/posts", postRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);

// 모든 라우터 최하단에
// 404 처리 용도
app.use((req, res) => {
  res.status(404).json({
    status: "Fail",
    message: "요청한 리소스는 찾을 수 없어요 ",
  });
});

// 500 의 경우에도 에러 처리
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "Error",
    message: `server error : ${err.stack}`,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중 입니다. `);
  models.sequelize
    .sync({ force: false }) // true -> false
    .then(() => {
      console.log("DB connected");
    })
    .catch(() => {
      console.error("DB error");
      process.exit();
    });
});
