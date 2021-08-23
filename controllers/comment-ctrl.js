const Comment = require("../models/comment-model");

// Création d'un commentaire //
exports.createComment = (req, res, next) => {
  const comment = {
    userId: req.decodedToken.userId,
    messageId: req.body.messageId,
    content: req.body.content,
  };
  Comment.create(comment)
    .then(() => res.status(201).json({ message: "Commentaire envoyé !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Obtention des commentaires //
exports.getAllComment = (req, res, next) => {
  Comment.findAll({
    where: { messageId: req.params.id },
  })
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(400).json({ error }));
};

// Obtention d'un commentaire //
exports.getOneComment = (req, res, next) => {
  Comment.findOne({ where: { id: req.params.id } })
    .then((comment) => res.status(200).json(message))
    .catch((error) => res.status(404).json({ error }));
};

// Suppression d'un commentaire //
exports.deleteComment = (req, res, next) => {
  Comment.findOne({ where: { id: req.params.id } }) // On trouve l'objet dans la base de données //
    .then((comment) => {
      Comment.destroy({ where: { id: req.params.id } }) // Méthode //
        .then(() => res.status(200).json({ message: "Réponse supprimée" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
