const { Sequelize, DataTypes, Model, Op } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "sample.db",
});

//모델정의
const User = sequelize.define(
  "user",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "users",
  }
);

(async () => {
  await sequelize.sync({ force: false });

  const user1 = await User.create({
    username: "양혜란",
    password: "admin1234",
    email: "yang@email.com ",
    birthDate: "1982-06-29",
  });
  console.log(`user1 => ${JSON.stringify(user1)}`);

  const user2 = await User.create({
    username: "양혜란2",
    password: "12345",
    email: "yang1@email.com ",
    birthDate: "1982-06-30",
  });
  console.log(`user2 => ${JSON.stringify(user2)}`);

  const users = await User.findAll();
  console.log(`users => ${JSON.stringify(users)}`);

  const user11 = await User.findByPk(2);
  console.log(`user11 => ${JSON.stringify(user11)}`);

  await User.update(
    {
      email: "yang2@email.com",
    },
    {
      where: {
        id: 2,
      },
    }
  );
  const user12 = await User.findByPk(2);
  console.log("user12 => ", JSON.stringify(user12));

  await User.destroy({
    where: {
      id: 2,
    },
  });

  const user14 = await User.findByPk(2);
  console.log(`user14 => ${JSON.stringify(user14)}`);
})();
