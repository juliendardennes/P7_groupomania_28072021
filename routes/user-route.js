//---Import Express : utilisez le routeur express---
const express = require("express");

//---creation du routeur express avec la méthode---
const router = express.Router();

const auth = require("../middleware/auth");

//---Importer les contrôleurs des utilisateurs---
const userCtrl = require("../controllers/user-ctrl");

//---Route pour créer l'utilisateur---
router.post("/signup", userCtrl.signup);
//---Route pour se connecter---
router.post("/login", userCtrl.login);
// route pour supprimer l'utilisateur
router.delete("/:id", auth, userCtrl.deleteUser);
// route pour récuperer un utilisateur
router.get("/:id", auth, userCtrl.getOneUser);
// route pour récupérer tous les utilisateurs
router.get("/users", auth, userCtrl.getAllUsers);
// route pour modifier un utilisateur
router.put("/:id", auth, userCtrl.modifyUser);

module.exports = router;
