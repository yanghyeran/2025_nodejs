//1.express 모듈 가져오기
const express = require("express");

//2. express 애플리케이션 설정
const app = express();
//3. 포트 설정
const PORT = 3000;

//4.라우팅 설정
app.get("/", (req, res) => {
  //req: http요청 , res: http 응답
  res.send("hello world!");
});

app.get("/hello", (req, res) => {
  res.send("안녕");
});

app.get("/world", (req, res) => {
  res.send("안녕/world 주소에 접근하셨습니다.");
});

//5. 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}실행중 입니다`);
});
