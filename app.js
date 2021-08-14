// importer Express (node JS Framework)
const express = require("express");

// bodyParser pour lire l'entrée du formulaire et le stocker en tant qu'objet JS
const bodyParser = require("body-parser");

const mysql = require("mysql2");

const Sequelize = require("sequelize");

const User = require("./models/User");

const userRoutes = require("./routes/user");

//Utiliser express
const app = express();

// Enregistrement des routeurs //
app.use("/api/auth", userRoutes);

module.exports = app;
