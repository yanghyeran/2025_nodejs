const { log } = require("winston");
const { Console } = require("winston/lib/winston/transports");

//.env파일을 프로그램상에 로드
require("dotenv").config();
console.log(`서버포트: ${process.env.PORT}`);

require("dotenv").config();
console.log(`DB_NAME: ${process.env.DB_NAME}`);

require("dotenv").config();
console.log(`DB_USER: ${process.env.DB_USER}`);

require("dotenv").config();
console.log(`B_PASSWORD: ${process.env.DB_PASSWORD}`);

require("dotenv").config();
console.log(`API_KEY: ${process.env.API_KEY}`);

require("dotenv").config();
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

//없는거 기본값 줄수 있음
console.log(`db port: ${process.env.DB_PORT || 5432}`);

//
if (!process.env.OPENAI_API_KEY) {
  console.error(`오픈 ai의 키가 필요합니다`);
}

const isDevelopment = process.env.NODE_ENV === "development";
if (isDevelopment) {
  console.log("개발환경 로직처리");
} else {
  console.log("운영환경 로직처리");
}
