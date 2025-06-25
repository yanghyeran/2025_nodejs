const { Sequelize, DataTypes, Model, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample.db",
});

//모델 생성
const Post = sequelize.define(
  "Post",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
    },
    author: DataTypes.STRING,
  },
  { tableName: "posts" } // 테이블 이름 지정
);

//
(async () => {
  //함수는 즉시실행하는 함수인데 Sequelize는 promise 이용하는데 async/await 문법을 사용하기 위해서

  await sequelize.sync({ force: true }); // 테이블 생성, force: true는 기존 테이블을 삭제하고 새로 생성

  // 포스트 생성
  const post1 = await Post.create({
    title: "오늘은 비가온데요",
    content: "퇴근시간부터 온데요. 저녁에오길",
    author: "양혜란 ",
  });
  console.log(`post1 created => ${JSON.stringify(post1)}`); // 생성된 포스트 출력

  const post2 = await Post.create({
    title: "오늘은 저녁은 뭐먹지",
    content: "떡볶이와 순대 오뎅이 어떨까요",
    author: "양혜란 ",
  });
  console.log(`post2 created => ${JSON.stringify(post2)}`); // 생성된 포스트 출력

  // 찾기
  const posts = await Post.findAll();
  console.log(`posts findAll => ${JSON.stringify(posts)}`); // 모든 포스트 출력

  const post11 = await Post.findByPk(1); // 기본키로 포스트 찾기
  console.log(`post11 => ${JSON.stringify(post11)}`); //

  const post12 = await Post.findOne({
    where: {
      author: "양혜란",
    },
  });
  console.log(`post12 => ${JSON.stringify(post12)}`); // author가 양혜란인 포스트 찾기

  update;
  await Post.update(
    {
      title: "이번주는 orm공부하는 주",
      content: "sequelize를 이용해서 orm을 공부하는 주",
    },
    {
      where: {
        id: 1, // id가 1인 포스트 수정
      },
    }
  );

  const post13 = await Post.findByPk(1);
  console.log(`post13 => ${JSON.stringify(post13)}`); // 수정된 포스트 출력

  //destroy (삭제)
  await Post.destroy({
    where: {
      id: 1,
    },
  });

  const post14 = await Post.findByPk(1);
  console.log(`post14 => ${JSON.stringify(post14)}`); // 삭제된 포스트 출력
})();
