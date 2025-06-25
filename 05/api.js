const express = require("express"); // express 모듈 임포트
const moment = require("moment"); // 날짜 모듈 임포트
const Database = require("better-sqlite3"); // sqlite3 모듈 임포트
const path = require("path"); // 경로 모듈 임포트
const { log } = require("console");
// DB 설정
const db_name = path.join(__dirname, "post.db"); // sqlite 용 데이터베이스 파일
const db = new Database(db_name); // better-sqlite3의 데이터베이스를 생성(with 데이터베이스파일)

// express setting
const app = express(); // app 이란 변수에 express 함수를 담습니다. app 변수를 이용해서 express 기능사용
const PORT = 3000; // 포트 설정
app.use(express.json()); // app.use 미들웨를 설정하는거에요. 모든 요청과 응답에 json 포멧을 처리한다.

app.use((req, res, next) => {
  console.log("나의첫번재 미들웨어");
  next();
});

// 1. post.db 게시판 전용 테이블을 만들어야합니다.
const create_sql = `
    create table if not exists posts (
        id integer primary key autoincrement, 
        title varchar(255), 
        content text, 
        author varchar(100),
        createdAt datetime default current_timestamp,
        count integer default 0
    );
    
    create table if not exists comments (
      id integer primary key autoincrement,
      content text,
      author text, 
      createdAt datetime default current_timestamp, 
      postId integer, 
      foreign key(postId) references posts(id) on delete cascade 
    );
`;
db.exec(create_sql); // exec sql을 실행 시킨다.
app.post("/posts", (req, res) => {
  const { title, content, author } = req.body;
  let sql = ` 
        insert into posts(title, content, author)
        values(?, ? ,?);
    `;

  const stmt = db.prepare(sql);
  const result = stmt.run(title, content, author); // insert into posts -> 자동증가된 id 가 반환 : lastInsertRowid
  const newPost = db
    .prepare(`select * from posts where id = ?`)
    .get(result.lastInsertRowid);
  res.status(201).json({ message: "ok", data: newPost });
});

// 게시글 목록 조회 http://localhost:3000/posts?page=2 GET
app.get("/posts", (req, res) => {
  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = 5;
  const offset = (page - 1) * limit;
  let sql = `
        select id, title, author, createdAt, count
        from posts order by createdAt desc limit ? offset ?
    `;
  const stmt = db.prepare(sql); // 쿼리를 준비하세요
  const rows = stmt.all(limit, offset); //쿼리를 실행하고 결과는 [] 배열로 반환해주세요

  // 전체 게시글 수 조회ㅓ
  const totalCount = db
    .prepare(`select count(*) as count from posts`)
    .get().count;
  const totalPages = Math.ceil(totalCount / limit); // 20 / 5 => 4

  res.status(200).json({
    data: rows,
    pagination: {
      currentPage: page,
      totalPages: totalPages,
      totalCount: totalCount,
      limit: limit,
    },
  });
});

// 게시글 상세 정보조회 http://localhost:3000/2 GET
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  let sql = `
        select id, title, content, author, createdAt, count
        from posts where id = ?
    `;
  let ac_sql = `update posts set count = count + 1 where id = ? `;
  db.prepare(ac_sql).run(id);
  const stmt = db.prepare(sql); // select 쿼리문이 준비 완료
  const post = stmt.get(id); //  {} 로 반환 합니다.
  res.status(200).json({ data: post }); // json 문자열로 리턴 합니다.
});

// 게시글 수정 (수정할 게시글 id --> req.params, 수정할 내용(title, content) ->req.body )
// http://localhost:3000/posts/1 PUT
app.put("/posts/:id", (req, res) => {
  const id = req.params.id; // 수정할 게시글을 파람에서 가지고와
  const { title, content } = req.body; // 수정할 내용은 본문에서 가지와
  let sql = `
        update posts set title = ?, content = ? 
        where id = ?
    `; // 쿼리문 만들어서
  const stmt = db.prepare(sql); // 쿼리문을 준비시키고
  stmt.run(title, content, id); // stmt.run title, content, id 넣어서 날린다.

  const updatedPost = db.prepare(`select * from posts where id = ?`).get(id);
  if (!updatedPost) {
    return res.status(404).json({ message: "게시물을 찾을 수 없습니다. " });
  }
  res.status(200).json({ message: "ok", data: updatedPost });
});

// http://localhost:3000/posts/2 DELETE
app.delete("/posts/:id", (req, res) => {
  const id = req.params.id; // 1. 삭제할 게시글 아이디를 가지고오고
  let sql = `delete from posts where id = ?`; // 2. 쿼리문을 만들어서
  const stmt = db.prepare(sql); // 3. 쿼리문을 준비시기코
  stmt.run(id); // 4. 쿼리문을 실행합니다.
  res.json({ message: "ok" }); // 5. 결과로 응답 줍니다.
});

//게시글 답글 추가
app.post("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;
  const { content, author } = req.body;
  // 1. 게시글 이 있는지 확인
  const post = db.prepare(`select id from posts where id = ? `).get(postId); // 엉뚱한 게시글 번호인지 확인
  if (!post) {
    return res.status(404).json({ message: "게시글을 찾을 수 없어용" });
  }
  // 2. 답변 추가
  const sql = `insert into comments(postId, author, content) values(?,?,?)`;
  const result = db.prepare(sql).run(postId, author, content);
  // 3. 신규 답변 조회 및 반환
  const newComment = db
    .prepare(`select * from comments where id = ?`)
    .get(result.lastInsertRowid);
  res.status(201).json({ message: "ok", data: newComment });
});

//게시글 답글 목록 가져오기
app.get("/posts/:id/comments", (req, res) => {
  const postId = req.params.id;

  const post = db.prepare(`select id from posts where id = ?`).get(postId);
  if (!post) {
    return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
  }
  // 게시글 답글 목록 조회
  const sql = `select id, author, content, createdAt from comments where postId = ? order by id desc`;
  const comments = db.prepare(sql).all(postId);
  res.status(200).json({ message: "ok", data: comments });
});

app.delete("/posts/:postId/comments/:commentId", (req, res) => {
  const { postId, commentId } = req.params;
  const comment = db
    .prepare(`select id from comments where postId = ? and id = ?`)
    .get(commentId, postId);

  if (!comment) {
    return res.status(404).json({ message: "답변을 찾을 수 없습니다." });
  }

  const sql = `delete from comments where id = ?`;
  db.prepare(sql).run(commentId);

  res.status(204).end();
});

app.listen(PORT, () => {});

//게시글 답글 수정
app.put("/posts/:postId/comments/:commentId", (req, res) => {
  const { postId, commentId } = req.params;
  const { author, content } = req.body;
  const comment = db
    .prepare(`select * from comments where postId = ? and id = ?`)
    .get(postId, commentId);

  if (!comment) {
    return res.status(404).json({ message: "댓글이 없습니다." });
  }

  const newAuthor = author !== undefined ? author : comment.author;
  const newContent = content !== undefined ? content : comment.content;

  db.prepare(`update comments set content = ?, author = ? where id = ?`).run(
    newContent,
    newAuthor,
    commentId
  );

  const updatedComment = db
    .prepare(`select * from comments where id = ?`)
    .get(commentId);
  res.status(200).json({ message: "ok", data: updatedComment });
});
