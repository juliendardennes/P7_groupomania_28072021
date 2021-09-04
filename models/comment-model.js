const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "groupomania",
  "juliendardennes",
  "Criminals13",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

try {
  sequelize.authenticate();
  console.log("connexion reussi");
} catch (error) {
  console.log("connexion pas reussi");
}

const Comment = sequelize.define("comment", {
  //définition des attributs du modèle
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: true,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  user_id: {
    type: Sequelize.UUID,
    allowNull: true,
  },
  post_id: {
    type: Sequelize.UUID,
    allowNull: true,
  },
});

Comment.sync({
  alter: true,
});

module.exports = Comment;
