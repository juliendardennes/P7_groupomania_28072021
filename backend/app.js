// importer Express (node JS Framework)
const express = require("express");
// bodyParser pour lire l'entrée du formulaire et le stocker en tant qu'objet JS
const bodyParser = require("body-parser");
//---Importer path : pour travailler avec les chemins de fichiers et de répertoires---
const path = require("path");
// Helmet vous aide à sécuriser vos applications Express en définissant divers en-têtes HTTP
const helmet = require("helmet");

//importation de la route user
const userRoutes = require("./routes/user-route");
// importation de la route post
const postRoutes = require("./routes/post-route");
//importation de la route commentaire
const commentRoutes = require("./routes/comment-route");
// importation de la route post médias
const mediaRoutes = require("./routes/mediapost-route");
// importation de la route commentaire média
const commentMediaRoutes = require("./routes/commentMedia-route");

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

//Transformer les données de la méthode POST en JSon //
app.use(bodyParser.json());

// API plus sécurisée pour respecter l'OWASP
app.use(helmet());

app.use("/images", express.static(path.join(__dirname, "images")));

//route pour l'utilisateur
app.use("/api/auth", userRoutes);

// route pour les posts
app.use("/api/posts", postRoutes);

//route pour les commentaires
app.use("/api/comments", commentRoutes);

// route pour les posts médias
app.use("/api/mediapost", mediaRoutes);

// route pour les commentaires médias
app.use("/api/commentMedia", commentMediaRoutes);

//---Pour charger des fichiers qui se trouvent dans le répertoire images--
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
