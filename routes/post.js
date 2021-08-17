//---Import Express : utilisez le routeur express---
const express = require("express");

//---Appel du routeur express avec la méthode---
const router = express.Router();

//---Importer les contrôleurs de post. Les fonctions sont associées aux différentes routes---
const postControl = require("../controllers/post");

//---Importer l'authentification : obtenez la configuration d'authentification JsonWebToken---
const auth = require("../middleware/auth");

//---Import Multer: Manage images---
const multer = require("../middleware/multer-config");

// On rajoute le middleware auth sur les routes qu'on veut protéger //
router.post("/new", auth, postControl.createPost);
router.put("/:id", auth, postControl.modifyPost);
router.delete("/:id", auth, postControl.deletePost);
router.get("/:id", auth, postControl.getOnePost);
router.get("/", auth, postControl.getAllPost);

module.exports = router;
