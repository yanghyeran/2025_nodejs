const http = require("http");

//http요청 req,http응답 res
const server = http.createServer((req, res) => {
  //요청이 올때마다 실행되는 콜백함수 //헤더정보: 브라우저에게 응답은 200이고 컨텐트타입은 텍스트, 캐릭터셋은 utf-8
  res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("안녕하세요~양혜란의 첫번째 웹서버에 오셨어용");
});
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`나만의 웹서버가 http://localhost:${PORT} 에서 실행 중 입니다.`);
});
//크롬에서 커맨드+옵션+j = 개발자도구 / (ssh 원격 터미널 연결용: 22 포트),ftp 포트:21 ,postgres :5432, mysql:3306 ,smtp메일: 25
//응답코드 200,201 요청성공 ./301 요청한 리소스가 영구적으로 이동./ 400요청이 잘못되어 서버에러 401 인증필요. 404 요청한 리소스가없음/ 500 인터널 서버에러
