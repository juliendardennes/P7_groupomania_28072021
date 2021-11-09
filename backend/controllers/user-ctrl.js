//---importer le package crypto-js : pour hacher l'email---
const MD5 = require("crypto-js/md5");

//---Importer le package Bcrypt : pour hacher le mot de passe---
const bcrypt = require("bcrypt");

//---Importer le package JsonWebToken : pour attribuer ---
//---un token à un utilisateur lorsqu'il se connecte ---
const jwt = require("jsonwebtoken");

//---Importer le modèle de l'utilisateur
const User = require("../models/user-model");

// ---fonction signup, création nouvel utilisateur--
exports.signup = (req, res, next) => {
  email = null;
  if (!req.body.email.includes(("@" && ".com") || ".fr" || ".net")) {
    res.statusMessage = "Veuillez entrer une adresse mail valide !";
    res.status(401).end();
  } else {
    email = req.body.email;
  }
  User.findOne({
    attributes: ["email"],
    where: { email: MD5(req.body.email).toString() },
  })
    .then((user) => {
      if (!user) {
        bcrypt
          .hash(req.body.password, 10) //Fonction pour hasher un mot de passe fonction async//
          .then((hash) => {
            User.create({
              email: MD5(req.body.email).toString(),
              password: hash,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
            }).then((user) => {
              res.status(201).json(user);
            });
          })
          .catch((error) => res.status(400).json({ error }));
      } else {
        res.statusMessage = "un utilisateur avec cet email existe déjà !";
        res.status(401).end();
      }
    })

    .catch((error) =>
      res.status(500).json({ error: "Utilisateur déjà existant" })
    );
};

//---fonction login - vérifie si un utilisateur existe déjà ---
exports.login = (req, res, next) => {
  User.findOne({
    where: { email: MD5(req.body.email).toString() },
  })
    .then((user) => {
      console.log(user);
      if (!user) {
        res.statusMessage = "utilisateur inconnu";
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            res.statusMessage = "Le mot de passe est incorrect";
            res.status(401).end();
          }
          // si comparaison ok, on renvoit un objet JSON contenant
          res.status(200).json({
            // l'userId
            user_id: user.id,
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

// Suppression d'un compte //
exports.deleteUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      User.destroy({ where: { id: req.params.id } }) // Méthode //
        .then(() => res.status(200).json({ message: "Compte supprimé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// ----------modifier un utilisateur------------
exports.modifyUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      lastName = req.body.lastName;
      firstName = req.body.firstName;
      User.update()
        .then(() => res.status(201).json({ message: " Compte modifié !" }))
        .catch(() => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// pour récupérer un compte utilisateur.
exports.getOneUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};

// pour récupérer tous les comptes d'utilisateurs.
exports.getAllUsers = (req, res, next) => {
  User.findAll({ attributes: ["id", "firstName", "lastName"] })
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};
