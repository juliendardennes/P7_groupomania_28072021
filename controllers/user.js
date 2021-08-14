//---importer le package crypto-js : pour hacher l'email---
const MD5 = require("crypto-js/md5");

//---Importer le package Bcrypt : pour hacher le mot de passe---
const bcrypt = require("bcrypt");

//---Importer le package JsonWebToken : pour attribuer ---
//---un token à un utilisateur lorsqu'il se connecte ---
const jwt = require("jsonwebtoken");

//---Importer le modèle de l'utilisateur
const User = require("../models/User");

//---- mise en place de Regex
const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}/;
const regexPassword =
  /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

//---fonction signup, sauvegarde d'un nouvel utilisateur--
exports.signgup = (req, res, next) => {
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
  User.create = (req, res, next) => {
    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = new User({
          email: MD5(req.body.email).toString(),
          password: hash,
        });
        user
          .save()
          .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  };
};

//---fonction login - vérifie si un utilisateur existe---
exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            //--encoder un nouveau token--
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
