module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "Note",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
      },
      tag: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "notes",
    }
  );
  return Note;
};
