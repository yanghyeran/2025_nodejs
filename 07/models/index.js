"use strict";
// 필요한 모듈 임포트
// 필요한 모듈 임포트
const fs = require("fs"); // 파일시스템 todos.js 같은 파일을 읽어야 합니다.
const path = require("path"); // 경로 임포트
const Sequelize = require("sequelize"); // 시퀄라이즈 임포트
const process = require("process"); // 환경 변수 처리 위해서
const basename = path.basename(__filename); // index.js 위치한 디렉토리 위치
const env = process.env.NODE_ENV || "development"; // 환경변수에 NODE_ENV development
const config = require(__dirname + "/../config/config.json")[env]; // config/config.json
const db = {};

// sequelize 객체를 생성
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// 파일을 읽어요 현재 index.js 디렉토리에 있는 파일을 모두 읽는데
// 확장자가 없거나 .js 아니거나, .test.js 로 끝나는 파일이 아닌경우는
// 모두 읽어요
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    // 읽은 파일 목록을 순회 하면서  [todo.js]
    // 파일 하나씩 여기서 작업해줍니다.
    // require("./todo.js")
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
    // db["Todo"] = Todo
    // db["Post"] = Post
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  } //관계설정
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
