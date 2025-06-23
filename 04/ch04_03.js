const express = require("express");
const app = express();
const PORT = 3000;

const books = [
  { id: 1, title: "Node.js 교과서", author: "이지훈" },
  { id: 2, title: "한눈에 보는 Node.js", author: "이지훈" },
  { id: 3, title: "Node.js 디자인패턴", author: "이지훈" },
];

app.use(express.json()); // 미들웨어, 응답과 요청시에 JSON을 처리 담당
// http://localhost:3000/books
app.get("/books", (req, res) => {
  res.json(books);
});
// http://localhost:3000/books/1, http://localhost:3000/books/2
app.get("/books/:id", (req, res) => {
  const id = req.params.id; // 문자열
  const book = books.find((b) => b.id === parseInt(id)); // === 타입이랑 값이 동일해야 참
  if (!book) {
    return res.status(404).json({ message: "책을 찾을 수 없어용" });
  }
  res.json(book); // status 200
});

app.post("/books", (req, res) => {
  const { title, author } = req.body; // 요청 본문에서 title, author 를 추출
  const book = {
    id: books.length + 1,
    title,
    author,
  };
  books.push(book); // push 배열에 book객체 추가
  res.status(201).json(book);
});
// http://localhost:3000/books/1
app.put("/books/:id", (req, res) => {
  const id = req.params.id;
  const { title, author } = req.body;
  const book = books.find((book) => book.id === parseInt(id));
  if (!book) {
    return res.status(404).json({ error: "책을 찾을 수 없어용" });
  }
  book.title = title;
  book.author = author;
  res.json(book);
});

app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  const index = books.findIndex((book) => book.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "책을 찾을 수 없어용" });
  }
  books.splice(index, 1);
  res.status(204).send(); // 204 의미는 No Content 요청은 성공했지만 너에게 줄 컨텐츠는 없어
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행중`);
});
