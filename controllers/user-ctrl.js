//---importer le package crypto-js : pour hacher l'email---
const MD5 = require("crypto-js/md5");

//---Importer le package Bcrypt : pour hacher le mot de passe---
const bcrypt = require("bcrypt");

//---Importer le package JsonWebToken : pour attribuer ---
//---un token à un utilisateur lorsqu'il se connecte ---
const jwt = require("jsonwebtoken");

//---Importer le modèle de l'utilisateur
const User = require("../models/user-model");

//---fonction signup, nouvel utilisateur--
exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        email: req.body.email,
        password: hash,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      })
        .then((user) => {
          res.status(201).json(user);
        })
        .catch((error) =>
          res.status(400).json({ error: "Utilisateur déjà existant" })
        );
    })
    .catch((error) => res.status(500).json({ error }));
};

//---fonction login - vérifie si un utilisateur existe---
exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "l'email est incorrect !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res
              .status(401)
              .json({ error: " le mot de passe est incorrect !" });
          }
          // si comparaison ok, on renvoit un objet JSON contenant
          res.status(200).json({
            // l'userId
            userId: user._id,
            // un token - fonction sign de jsonwebtoken
            token: jwt.sign(
              // 1er argument: données à encoder
              { userId: user._id },
              // 2eme: clé secrète encodage
              "RANDOM_TOKEN_SECRET",
              // 3eme: argument de configuration
              { expiresIn: "24h" }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// // Suppression d'un compte //
exports.deleteUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      User.destroy({ where: { id: req.params.id } }) // Méthode //
        .then(() => res.status(200).json({ message: "Compte supprimé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
