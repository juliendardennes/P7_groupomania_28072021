//---Import Express : utilisez le routeur express---
const express = require("express");

//---Appel du routeur express avec la méthode---
const router = express.Router();

//---Importer l'authentification : obtenez la configuration d'authentification JsonWebToken---
const auth = require("../middleware/auth");

// Importer les contrôleurs de commentaires.
const commentCtrl = require("../controllers/comment-ctrl");

// route pour créer un commentaire
router.post("/:id/comments", auth, commentCtrl.createOneComment);
// route pour supprimer un commentaire
router.delete("/:id/comments", auth, commentCtrl.deleteOneComment);
