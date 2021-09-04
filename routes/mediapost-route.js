//---Import Express : utilisez le routeur express---
const express = require("express");

//---Appel du routeur express avec la méthode---
const router = express.Router();

//---Importer l'authentification : obtenez la configuration d'authentification JsonWebToken---
const auth = require("../middleware/auth");

const multer = require("../middleware/multer-config");

//---Importer les contrôleurs de media post
const mediaControl = require("../controllers/mediaPost-ctrl");

//---Route pour créer un post
router.post("/", auth, multer, mediaControl.createMedia);
//---Route pour supprimer un post ---
router.delete("/:id", auth, multer, mediaControl.deleteMedia);
//Route pour modifier un post
router.put("/:id", auth, multer, mediaControl.modifyMedia);
// route pour récuperer un post media
router.get("/:id", auth, mediaControl.getOneMedia);
// route pour récupérer tous les posts media
router.get("/", auth, mediaControl.getAllMedias);

module.exports = router;
