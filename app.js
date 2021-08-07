// importer Express (node JS Framework)
const express = require("express");

const http = require("http");

//Créer une application Express.
const app = express();

app.use((req, res) => {
  res.json({ message: "Votre requête a bien été reçue !" });
});

module.exports = app;
