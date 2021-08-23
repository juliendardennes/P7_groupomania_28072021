const Model = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define("Comment", {
    userId: DataTypes.INTEGER,
    messageId: DataTypes.INTEGER,
    content: DataTypes.TEXT,
  });

  Comment.associate = function (models) {
    Comment.belongsTo(models.User, {
      foreignKey: "userId",
    });
    Comment.belongsTo(models.Message, {
      foreignKey: "messageId",
      onDelete: "CASCADE", // Si on supprime un post, on supprime ses commentaires //
    });
  };
  return Comment;
};
