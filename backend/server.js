const express = require("express");
const bodyParser = require("body-parser");

//---Importer le package http pour transférer des données via le protocole de transfert hypertexte---
const http = require("http");

// importation du fichier app.js
const app = require("./app");

//---Normaliser un port pour s'assurer que le port fourni
// est un nombre sinon un nombre alors une chaîne et si
// quoi que ce soit d'autre, définissez-le sur false---
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

//---Réglage du port à 3000---
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

//---Traitement des erreurs en cas de dysfonctionnement--
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      //permission refusée
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      //Port déjà utilisé
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//---Créez un serveur avec express qui utilise l'application---
//---et créez une constante pour les appels de serveur (requêtes et réponses)--
const server = http.createServer(app);

//---Erreur en cas de problème lors du démarrage du serveur---
server.on("error", errorHandler);

server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  // en utilisant le port sur lequel le serveur fonctionnera
  console.log("Listening on " + bind);
  // message de confirmation
});

//---Le serveur écoute le port défini ci-dessus---
server.listen(port);
