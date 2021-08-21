const model = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define("Post", {
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    image: DataTypes.STRING,
  });

  Post.associate = function (models) {
    //Associations can be define here//
    Post.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      onDelete: "CASCADE", // Si on supprime un user, on supprime ses messages //
    });
  };
  return Message;
};
