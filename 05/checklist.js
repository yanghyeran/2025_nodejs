const express = require("express"); // express 모듈 임포트
const moment = require("moment"); // 날짜 모듈 임포트
const Database = require("better-sqlite3"); // sqlite3 모듈 임포트
const path = require("path"); // 경로 모듈 임포트
// DB 설정
const db_name = path.join(__dirname, "checklist.db"); // sqlite 용 데이터베이스 파일
const db = new Database(db_name); // better-sqlite3의 데이터베이스를 생성(with 데이터베이스파일)

// express setting
const app = express(); // app 이란 변수에 express 함수를 담습니다. app 변수를 이용해서 express 기능사용
const PORT = 3000; // 포트 설정
app.use(express.json()); // app.use 미들웨를 설정하는거에요. 모든 요청과 응답에 json 포멧을 처리한다.

const sql = `
    create table if not exists checklist(
        id integer primary key autoincrement,
        category text,
        item text, 
        amount integer,
        checkyn boolean default 0
    );
`;

db.exec(sql);

//post 체크리스트 입력 http://localhost:3000/checklist
app.post("/checklist", (req, res) => {
  const { category, item, amount } = req.body;
  const result = db
    .prepare(`insert into checklist(category, item, amount) values(?, ?, ?)`)
    .run(category, item, amount);

  const newCheckList = db
    .prepare(`select * from checklist where id = ?`)
    .get(result.lastInsertRowid);
  res.status(201).json({ message: "ok", data: newCheckList });
});

//get 체크리스트 카테고리 목록 조회 http://localhost:3000/checklist?q=캠핑 /여름휴가
app.get("/checklist", (req, res) => {
  const q = req.query.q;
  const rows = db.prepare(`select * from checklist where category = ?`).all(q);
  res.status(200).json({ message: "ok", data: rows });
});

//put 체크리스트 체크여부 토글 http://localhost:3000/checklist/:id
app.put("/checklist/:id", (req, res) => {
  const id = req.params.id;
  db.prepare(
    `UPDATE checklist SET checkyn = CASE checkyn WHEN 1 THEN 0 ELSE 1 END WHERE id = ? `
  ).run(id);
  const item = db.prepare(`select * from checklist where id = ? `).get(id);
  res.status(200).json({ message: "ok", data: item });
});

//delete 체크리스트 항목 삭제 http://localhost:3000/checklist/:id
app.delete("/checklist/:id", (req, res) => {
  const id = req.params.id;
  const result = db.prepare(`delete from checklist where id = ?`).run(id);
  if (result.changes == 0) {
    res.status(404).json({ message: "항목을 찾을 수 없어용 " });
  }
  res.status(204).send();
});

app.listen(PORT, () => {});
