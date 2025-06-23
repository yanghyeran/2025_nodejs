const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send(`
        <html>
          <head>
            <title> 첫번째 마이홈피 </title>
          </head>
          <body>
            <h1>  첫번째 익스프레스홈 </h1>
            <nav>
            <a href="/"> 홈 </a>
              <a href="/about"> 소개 </a>
                <a href="/contact"> 연락처 </a>
            </nav>
                <p> 익스프레스로 만든 홈피</p>
          </body>
        </html>
        `);
});

app.get("/about", (req, res) => {
  res.send(`
                <h1>소개</h1> <p>fffff</p>
                `);
});

app.get("/contact", (req, res) => {
  res.send(`
                <h1>연락처</h1> <p>111@gmail.com</p>
                `);
});

app.listen(3001, () => {
  console.log(`서버가 http://localhost:${3001}실행중 입니다`);
});
