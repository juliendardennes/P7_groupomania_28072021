// importer Express (node JS Framework)
const express = require("express");

// bodyParser pour lire l'entrée du formulaire et le stocker en tant qu'objet JS
const bodyParser = require("body-parser");

//---Importer path : pour travailler avec les chemins de fichiers et de répertoires---
const path = require("path");

const mysql = require("mysql");

const Sequelize = require("sequelize");

const User = require("./models/User");

const userRoutes = require("./routes/user");

//Utiliser express
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // On accéde à l'API depuis diverses origines //
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); // Liste requêtes autorisées //
  next();
});

// //Transformer les données de la méthode POST en JSon //
app.use(bodyParser.json());

// Enregistrement des routeurs //
app.use("/api/auth", userRoutes);

module.exports = app;
