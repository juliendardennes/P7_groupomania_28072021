//---Import Express : utilisez le routeur express---
const express = require("express");

//---Appel du routeur express avec la méthode---
const router = express.Router();

//---Importer l'authentification : obtenez la configuration d'authentification JsonWebToken---
const auth = require("../middleware/auth");

const multer = require("../middleware/multer-config");

//---Importer les contrôleurs de post
const postControl = require("../controllers/post-ctrl");

//---Route pour créer un post
router.post("/", auth, multer, postControl.createPost);
//---Route pour supprimer un post ---
router.delete("/:id", auth, postControl.deletePost);
//Route to modify a post.
router.put("/:id", auth, multer, postControl.modifyPost);
router.get("/:id", auth, postControl.getOnePost);
router.get("/", auth, postControl.getAllPosts);

module.exports = router;
