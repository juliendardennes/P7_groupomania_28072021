//---Import Express : utilisez le routeur express---
const express = require("express");

//---Appel du routeur express avec la méthode---
const router = express.Router();

//---Importer l'authentification : obtenez la configuration d'authentification JsonWebToken---
const auth = require("../middleware/auth");

//---Importer les contrôleurs de post. Les fonctions sont associées aux différentes routes---
const postControl = require("../controllers/post-ctrl");

//---Import Multer: Manage images---
const multer = require("../middleware/multer-config");

//---Route pour créer un post : Capture et enregistre l'image,---
//---analyse le post à l'aide d'une chaîne et l'enregistre---
//---dans la base de données, en définissant correctement son URL image---
router.post("/", auth, multer, postControl.createPost);

// // //---Route pour mettre à jour un post : Met à jour un post avec l'ID fourni---
router.put("/:id", auth, multer, postControl.modifyPost);

//---Route pour supprimer un post : Supprimer le post avec l'identifiant fourni---
router.delete("/:id", auth, postControl.deletePost);

//---Route pour obtenir tous les posts : renvoie
//---le tableau de tous les posts dans la base de données---
router.get("/", auth, postControl.getAllPost);

router.get("/:id", auth, postControl.getOnePost);

module.exports = router;
