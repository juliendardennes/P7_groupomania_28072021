const sequelize = require("sequelize");

module.exports = (sequelize, type) => {
  return sequelize.define("users", {
    //définition des attributs du modèle
    id: {
      type: type.integer,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: type.STRING,
  });
};

await sequelize.sync({ force: true });
console.log("Tous les modèles ont été synchronisés avec succès");
