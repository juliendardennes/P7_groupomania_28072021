// importer Express (node JS Framework)
const express = require("express");

// bodyParser pour lire l'entrée du formulaire et le stocker en tant qu'objet JS
const bodyParser = require("body-parser");

//---Importer path : pour travailler avec les chemins de fichiers et de répertoires---
const path = require("path");

// Helmet vous aide à sécuriser vos applications Express en définissant divers en-têtes HTTP
const helmet = require("helmet");

const Sequelize = require("sequelize");

const User = require("./models/user-model");

// importation de la route post
const postRoutes = require("./routes/post-route");

//importation de la route user
const userRoutes = require("./routes/user-route");

//Utiliser express
const app = express();

app.use(helmet()); // API plus sécurisée pour respecter l'OWASP

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

app.use("/images", express.static(path.join(__dirname, "images")));

// route pour les posts
app.use("/api/post", postRoutes);

// route pour l'utilisateur
app.use("/api/user", userRoutes);

module.exports = app;
