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

const User = sequelize.define("user", {
  //définition des attributs du modèle
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    allowNull: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});

User.sync({
  alter: true,
});

module.exports = User;
