const express = require("express"); //익스프레스 모듈 임포트
const moment = require("moment"); //날자 모듈 임포트
const Database = require("better-sqlite3"); //sqlite3모듈 임포트
const path = require("path"); //경로 모듈 임포트
// DB setting
const db_name = path.join(__dirname, "post.db"); //sqlite용 데이터베이스 파일
const db = new Database(db_name); // better-sqlite3 의 데이터베이스를 생성

// express setting
const app = express(); //앱 이란 변수에 익스프레스 함수를 담는다. 익스프레스 기능사용
const PORT = 3000;
app.use(express.json()); // app.use 미들웨어를 설정. 모든요청과 응답에 제이슨 포멧을 처리한다.

// 1. post.db 게시판 전용 테이블을 만들어야합니다.
const create_sql = `
    create table if not exists posts (
        id integer primary key autoincrement, 
        title varchar(255), 
        content text, 
        author varchar(100),
        createdAt datetime default current_timestamp,
        count integer default 0
    )
`;
db.exec(create_sql); //exec sql를 실행 시킨다.

// app.post -> 포스트 요청을 처리한다. http://my-url/posts POST ->두번째 인자의 핸들러함수실핼
app.post("/posts", (req, res) => {
  const { title, content, author } = req.body; //요청 본문 (바디) -title, content, author 제이슨 포멧
  let sql = ` 
        insert into posts(title, content, author)
        values( ?, ? ,?);
    `;
  //insert 쿼리문을 만들어 준다.
  const stmt = db.prepare(sql); //문자열 sql쿼리문으로 파싱한다. statement객체로 만든다.
  stmt.run(title, content, author);
  //stmt.run : update,insert,delete
  //stmt.all : select * from table or select * from table where ->[]배열로 값을 반환
  //stmt.get :  select +from table limit 1 -> { }객체로 값을 반환
  db.prepare(sql).run(title, content, author);
  res.status(201).json({ message: "ok" });
});

// 게시글 목록 조회
app.get("/posts", (req, res) => {
  let sql = `
        select id, title, author, createdAt , count
        from posts order by createdAt desc
    `;
  const stmt = db.prepare(sql); // 쿼리를 준비하세요
  const rows = stmt.all(); // 쿼리를 실향하고 결과는 []배열로 반환해주세요
  console.log(rows);
  res.status(200).json({ data: rows }); // json.stringify({data:rows}) 객체를 제이슨 문자열
});

// 게시글 상세 정보조회 gttp://localhost:3000/2 GET
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
        select id, title, content, author, createdAt, count
        from posts where id = ?
    `;
  const stmt = db.prepare(sql); // select 쿼리문이 준비 완료
  const post = stmt.get(id); //  실제 쿼리문이 실행 {}로 반환
  res.status(200).json({ data: post }); //json 문자열로 리턴
});

// 게시글 수정
// http://localhost:3000/posts/1
app.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  let sql = `
        update posts set title = ?, content = ? 
        where id = ?
    `;
  const stmt = db.prepare(sql); //쿼리문 준비
  stmt.run(title, content, id); // 실제 쿼리문 데이터베이스 실행
  // res.redirect("/posts"); // GET http://localhost:3000/posts
  //   res.json({ message: "ok" });
});

// 게시글 삭제
//http://localhost:3000/posts/2 delete
app.delete("/posts/:id", (req, res) => {
  const id = req.params.id; //삭제할 게시글 아이디를 가지고 오고
  let sql = "delete from posts where id = ?"; //쿼리문을 만들어서
  const stmt = db.prepare(sql); // 쿼리문을 준비시키고
  stmt.run(id); //쿼리문을 실행
  res.json({ message: "ok" }); //결과로 응답
});

// server start 시작- npx nodemon api.js
app.listen(PORT, () => {});
