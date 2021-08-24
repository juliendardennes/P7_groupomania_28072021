const Comment = require("../models/comment-model");
const comment = require("../routes/comment-route");

// creation d'un commentaire
exports.createOneComment = (req, res, next) => {
  Comment.create({
    post_id: req.body.user_id,
    content: req.body.content,
    title: req.body.title,
  })
    .then(() => res.status(201).json({ message: "commentaire crée" }))
    .catch((error) => res.status(400).json({ error }));
};

// Suppression d'un commentaire //
exports.deleteOneComment = (req, res, next) => {
  Comment.findOne({ where: { id: req.params.id } })
    .then((comment) => {
      Comment.destroy({ where: { id: req.params.id } }) // Méthode //
        .then(() => res.status(200).json({ message: "commentaire supprimé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
