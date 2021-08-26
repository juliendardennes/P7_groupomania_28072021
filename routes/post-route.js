//---Import Express : utilisez le routeur express---
const express = require("express");

//---Appel du routeur express avec la méthode---
const router = express.Router();

//---Importer l'authentification : obtenez la configuration d'authentification JsonWebToken---
const auth = require("../middleware/auth");

//---Importer les contrôleurs de post
const postControl = require("../controllers/post-ctrl");

//---Import Multer: Manage images---
const multer = require("../middleware/multer-config");

//---Route pour créer un post
router.post("/", auth, multer, postControl.createPost);
//---Route pour supprimer un post : Supprimer le post ---
router.delete("/:id", auth, multer, postControl.deletePost);

module.exports = router;
