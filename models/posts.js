const sequelize = require('sequelize');

module.exports = (sequelize, type) {
    return sequelize.define('post', {
        id : {
            type : type.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        postName : type.STRING,
    })
}