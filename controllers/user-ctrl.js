//---importer le package crypto-js : pour hacher l'email---
const MD5 = require("crypto-js/md5");

//---Importer le package Bcrypt : pour hacher le mot de passe---
const bcrypt = require("bcrypt");

//---Importer le package JsonWebToken : pour attribuer ---
//---un token à un utilisateur lorsqu'il se connecte ---
const jwt = require("jsonwebtoken");

//---Importer le modèle de l'utilisateur
const User = require("../models/user-model");

// ------------Regex------------------
const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}/;
const regexPassword =
  /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

// ---fonction signup, nouvel utilisateur--
exports.signup = (req, res, next) => {
  if (
    req.body.email == null ||
    req.body.password == null ||
    req.body.lastname == null ||
    req.body.firstname == null
  ) {
    return res.status(400).json({ error: "Données incomplètes" });
  }
  if (!regexEmail.test(req.body.email)) {
    return res.status(400).json({ error: "Email non validé" });
  }
  if (!regexPassword.test(req.body.password)) {
    return res.status(400).json({ error: "Mot de passe non validé" });
  }
  User.findOne({
    attributes: ["email"],
    where: { email: req.body.email },
  }) //Vérification si un utilisateur corresponde déjà à l'email de la DB//
    .then((user) => {
      if (!user) {
        bcrypt
          .hash(req.body.password, 10) //Fonction pour hasher un mot de passe fonction async//
          .then((hash) => {
            User.create({
              email: req.body.email,
              password: hash,
              firstname: req.body.firstname,
              lastname: req.body.lastname,
            }).then((user) => {
              res.status(201).json({ message: "Utilisateur créé !" });
            });
          })
          .catch((error) => res.status(400).json({ error }));
      }
    })

    .catch((error) =>
      res.status(500).json({ error: "Utilisateur déjà existant" })
    );
};

//---fonction login - vérifie si un utilisateur existe---
exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: " Utilisateur inconnu !" });
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
      lastname = req.body.lastname;
      firstname = req.body.firstname;
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
  User.findAll({ attributes: ["id", "firstname", "lastname"] })
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};
