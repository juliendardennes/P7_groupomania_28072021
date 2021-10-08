//---Import Express : utilisez le routeur express---
const express = require("express");

//---Appel du routeur express avec la méthode---
const router = express.Router();

//---Importer l'authentification : obtenez la configuration d'authentification JsonWebToken---
const auth = require("../middleware/auth");

//---Importer les contrôleurs de post
const postControl = require("../controllers/post-ctrl");

//---Route pour créer un post
router.post("/", auth, postControl.createPost);
//---Route pour supprimer un post ---
router.delete("/:id", auth, postControl.deletePost);
//Route pour modifier un post
router.put("/:id", auth, postControl.modifyPost);
// route pour récuperer un post
router.get("/:id", auth, postControl.getOnePost);
// route pour récupérer tous les posts
router.get("/", auth, postControl.getAllPosts);

module.exports = router;
