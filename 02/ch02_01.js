//파일다루기 fs모듈 이용
// const fs = require("fs"); //fs모듈 (파일다루기모듈)임포트

//동기방식 파일쓰기 예외 발생 시 try...catch로 처리, 함수가 파일 쓰기 작업을 완료할 때까지 다음 코드 실행을 멈춤
// fs.writeFileSync("test.txt", "hello world!");
// console.log("파일쓰기완료");

// fs.writeFileSync("hello.txt", "안녕하세요 반갑습니다 제이름은 양혜란 입니다");

//파일읽기
// const data = fs.readFileSync("test.txt", "utf-8"); //utf-8코딩
// console.log(data);

// const data2 = fs.readFileSync("hello.txt", "utf-8");
// console.log(data2);

// const stats1 = fs.statSync("test.txt");
// console.log(stats1);

//비동기방식 파일쓰기, 콜백 함수로 결과를 처리, 코드 흐름이 멈추지 않음 → 성능에 유리
// fs.writeFile("async-test.txt", "Async Hello World", (err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log("비동기 파일 쓰기 완료");
// });
/////////async-hello.txt파일을 만들고 ..
// fs.writeFile(
//   "async-hello.txt",
//   "안녕하세요 비동기 파일 쓰기 테스트 작업 입니다",
//   (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log("비동기 파일 쓰기 완료");
//   }
// );

// fs.readFile("async-test.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log("읽기에러", err);
//   }
//   console.log("비동기 파일 읽기 완료", data);
// });

// fs.readFile("async-hello.txt", "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(data);
// });
///////Promise -sync/await 방식
const fsPromise = require("fs").promises;
// const fileOp = async () => {
//   try {
//     await fsPromise.writeFile("promise-test.txt", "Promise Hello World");
//     console.log("파일 쓰기완료");

//     const data = await fsPromise.readFile("promise-test.txt", "utf-8");
//     console.log("파일읽기", data);
//   } catch (e) {
//     console.log(e);
//   }
// };
// fileOp();

// const fsPromise = require("fs").promises;
const fileOp2 = async () => {
  try {
    await fsPromise.writeFile(
      "promise-hello.txt",
      "안녕하세요 프로미스 방식으로 파일을 읽는 연습을 하고 있어요"
    );

    const data = await fsPromise.readFile("promise-hello.txt", "utf-8");
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};
fileOp2();
