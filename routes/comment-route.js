//---Import Express : utilisez le routeur express---
const express = require("express");

//---Appel du routeur express avec la méthode---
const router = express.Router();

//---Importer l'authentification : obtenez la configuration d'authentification JsonWebToken---
const auth = require("../middleware/auth");

//---Importer les contrôleurs de post
const postControl = require("../controllers/comment-ctrl");

//---Import Multer: Manage images---
const multer = require("../middleware/multer-config");

router.post("/:id/comments", auth, postControl.addComment);
router.delete("/comments/:id", auth, postControl.deleteComment);

module.exports = router;
