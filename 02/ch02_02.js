//파일경로만들기, __dirname : 현재 파일의 디렉토리 절대경로를 가져옴
const path = require("path");

const fullpath = path.join(__dirname, "files", "a", "b", "test.txt");
console.log(`전체경로: ${fullpath}`);

const fullpath2 = path.join(__dirname, "files", "tasks", "jobs", "01.txt");
console.log(`전체경로: ${fullpath2}`);

//경로분리
const pathParts = path.parse(fullpath);
console.log(pathParts);

const pathParts2 = path.parse(fullpath2);
console.log(pathParts2);

//확장자만 가져올때 extname
const ext = path.extname(fullpath);
console.log(ext); // .txt

// fs.existsSync 파일 또는 디렉터리가 존재하는지를 확인하는 동기 함수
const fs = require("fs"); //파일시스템 약자
const dirPath = path.join(__dirname, "new-dir");
console.log(dirPath);
if (!fs.existsSync(dirPath)) {
  //경로가 있으면 true,없으면 false  - 존재하면 안만든다.
  fs.mkdirSync(dirPath);
}

const dirPath2 = path.join(__dirname, "tasks");
if (!fs.existsSync(dirPath2)) {
  fs.mkdirSync(dirPath2);
}

const dirPath3 = path.join(__dirname, "tasks", "jobs", "01"); //경로 만들고
if (!fs.existsSync(dirPath3)) {
  //경로 존재여부 체크
  fs.mkdirSync(dirPath3, { recursive: true }); // 실제 디렉토리 생성
}

const filePath = path.join(dirPath3, "test.txt");
fs.writeFileSync(filePath, "디렉토리 생성 후 파일 생성 테스트");
//brew install tree 설치 후 tree . 시 확인가능

//문제
const dirPath4 = path.join(__dirname, "main", "src", "code");
if (!fs.existsSync(dirPath4)) {
  fs.mkdirSync(dirPath4, { recursive: true });
}
const filePath4 = path.join(dirPath4, "javascript.txt");
fs.writeFileSync(filePath4, "자바스크립트 데스트 파일 입니다.");

///디렉토리 이름변경
const newDirPath = path.join(__dirname, "rename-dir");
fs.renameSync(dirPath, newDirPath); //경로 변경

//디렉토리 삭제
fs.rmdirSync(newDirPath);

// const dirPath5 = path.join(__dirname, "new-dir");
// if (!fs.existsSync(dirPath5)) {
//   fs.mkdirSync(dirPath5);
// }
