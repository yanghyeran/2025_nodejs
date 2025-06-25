// 테이블 생성 구문
//  CREATE TABLE if not exists todos (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         task VARCHAR(255),
//         description TEXT,
//         completed BOOLEAN DEFAULT 0,
//         createdAt datetime default current_timestamp,
//         priority INTEGER DEFAULT 1
//     )`;
// 모델 생성 참고
// completed: {
//     type: DataTypes.BOOLEAN,
//     defaultValue: false
// },
// priority : {
//     type: DataTypes.INTEGER,
//     defaultValue: 1
// }

const { Sequelize, DataTypes, Model, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample.db",
});

//// 문제 1 : Todo 모델, todos  생성
const Todo = sequelize.define(
  "todo",
  {
    task: {
      type: DataTypes.STRING(255), //Sequelize에서는 **DataTypes.STRING**으로 문자열을 다루며, 길이 지정은 STRING(255) 형태로 처리
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    priority: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    tableName: "todos",
  }
);
// 문제 2 : Todo 데이터를 2개 입력
(async () => {
  await sequelize.sync({ force: false });

  const todo1 = await Todo.create({
    task: "장보기",
    description: "마트에서 장보기",
    completed: false,
    priority: 1,
  });
  console.log(`todo1 => ${JSON.stringify(todo1)}`);

  const todo2 = await Todo.create({
    task: "청소하기",
    description: "집안 청소하기",
    completed: false,
    priority: 2,
  });
  console.log(`todo2 => ${JSON.stringify(todo2)}`);

  // 문제 3 : Todo 데이터를 전체 조회
  const todos = await Todo.findAll();
  console.log(`todos => ${JSON.stringify(todos)}`);

  // 문제 4 : Todo 아이디가 2번인 항목조회
  const todo11 = await Todo.findByPk(2);
  console.log(`todo11 => ${JSON.stringify(todo11)}`);

  // 문제 5 : Todo 아이디가 2번인 항목의 completed 를 완료로 바꿈
  await Todo.update(
    {
      completed: true,
    },
    {
      where: {
        id: 2,
      },
    }
  );

  const todo12 = await Todo.findByPk(2);
  console.log(`todo12 => ${JSON.stringify(todo12)}`);

  // 문제 6 : Todo 아이디가 2번인 항목 삭제
  await Todo.destroy({
    where: {
      id: 2,
    },
  });

  const todo14 = await Todo.findByPk(2);
  console.log(`todo14 => ${JSON.stringify(todo14)}`);
})();
