const express = require("express");
const path = require("path");
const moment = require("moment");
const Database = require("better-sqlite3");

const db_name = path.join(__dirname, "expense.db");
const db = new Database(db_name);

const app = express();
const PORT = 3000;
app.use(express.json()); //미들웨어 -> 전체 엔드포인트에 특정 기능을 일괄적용

const create_sql = `
    create table if not exists expenses (
        id integer primary key autoincrement, 
        title text not null,
        amount integer not null,
        date text not null,
        memo text 
    );
`;
db.exec(create_sql);

//가계부 입력 post/ http://localhost:3000/expenses

app.post("/expenses", (req, res) => {
  const { title, amount, date, memo } = req.body;
  let sql = ` 
        insert into expenses(title, amount, date, memo)
        values( ?, ?, ? , ? )`;

  db.prepare(sql).run(title, amount, date, memo);
  res.status(200).json({ message: "ok" });
});

//가계부 목록조회 get/ http://localhost:3000/expenses

app.get("/expenses", (req, res) => {
  const sql = `select * from expenses`;
  const stmt = db.prepare(sql);
  const rows = db.prepare(sql).all();
  res.status(200).json({ message: "ok", data: rows });
});

//가계부 목록 조회 (날짜) get /http://localhost:3000/expenses/2025-06-22
app.get("/expenses/:date", (req, res) => {
  const date = req.params.date;
  console.log(date);
  const sql = `
   select * from expenses where date = ?
   `;
  const stmt = db.prepare(sql);
  const rows = stmt.all(date);
  res.status(200).json({ message: "ok", data: rows });
});

//가계부 수정 put/ http://localhost:3000/expenses/4 -> 금액수정,항목 등 수정
app.put("/expenses/:id", (req, res) => {
  const id = req.params.id;
  const { title, amount, date, memo } = req.body;
  const sql = `update expenses set title = ? , amount= ?, memo = ? where id = ?`;
  const stmt = db.prepare(sql);
  stmt.run(title, amount, date, memo, id);
  res.status(200).json({ message: "ok" });
});

//가계부 삭제 delete/ http://localhost:3000/expenses/1 -> 해당 가계부의 항목 삭제
app.delete("/expenses/:id", (req, res) => {
  const id = req.params.id;
  const sql = `delete from expenses where id = ?`;
  db.prepare(sql).run(id);
  const result = db.prepare(sql).run(id);
  res.status(200).json({ message: "삭제 완료" });
});

//서버 시작
app.listen(PORT, () => {});
