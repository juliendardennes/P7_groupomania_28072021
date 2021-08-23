//---Import Express : utilisez le routeur express---
const express = require("express");

//---Appel du routeur express avec la méthode---
const router = express.Router();

//---Importer l'authentification : obtenez la configuration d'authentification JsonWebToken---
const auth = require("../middleware/auth");

//---Importer les contrôleurs de post. Les fonctions sont associées aux différentes routes---
const commentControl = require("../controllers/comment-ctrl");

router.post("/new", auth, commentControl.createComment);
router.get("/:id/display", auth, commentControl.getAllComment);
router.get("/:id", auth, commentControl.getOneComment);
router.delete("/:id", auth, commentControl.deleteComment);

module.exports = router;
