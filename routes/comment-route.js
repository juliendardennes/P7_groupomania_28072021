//---Import Express : utilisez le routeur express---
const express = require("express");

//---Appel du routeur express avec la méthode---
const router = express.Router();

//---Importer l'authentification : obtenez la configuration d'authentification JsonWebToken---
const auth = require("../middleware/auth");

//---Importer les contrôleurs de post
const commentControl = require("../controllers/comment-ctrl");

//Route pour créer un commentaire
router.post("/:id/comments", auth, commentControl.createComment);
//Route pour modifier un commentaire
router.put("/:id/comments/:id", auth, commentControl.modifyComment);
//Route pour effacer un commentaire
router.delete("/:id/comments/:id", auth, commentControl.deleteComment);
//Route pour récupérer tous les commentaires
router.get("/:id/comments", auth, commentControl.getAllComments);

module.exports = router;
