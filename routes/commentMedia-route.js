//---Import Express : utilisez le routeur express---
const express = require("express");

//---Appel du routeur express avec la méthode---
const router = express.Router();

//---Importer l'authentification : obtenez la configuration d'authentification JsonWebToken---
const auth = require("../middleware/auth");

//---Importer les contrôleurs des commentaires media
const commentMediaControl = require("../controllers/commentMedia-ctrl");

//Route pour créer un commentaire
router.post("", auth, commentMediaControl.createCommentMedia);
//Route pour modifier un commentaire
router.put("/:id", auth, commentMediaControl.modifyCommentMedia);
//Route pour effacer un commentaire
router.delete("/:id", auth, commentMediaControl.deleteCommentmedia);
//Route pour récupérer tous les commentaires
router.get("/", auth, commentMediaControl.getAllCommentsMedia);
//Route pour récupérer un commentaire
router.get("/:id", auth, commentMediaControl.getOneCommentMedia);

module.exports = router;
