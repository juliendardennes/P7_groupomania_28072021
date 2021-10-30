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

const Media = sequelize.define("media", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: true,
  },
  media: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  user_id: {
    type: Sequelize.UUID,
    allowNull: false,
  },
});

Media.sync({
  alter: true,
});

module.exports = Media;
