const CommentMedia = require("../models/commentMedia-model");
const commentMedia = require("../routes/commentMedia-route");
const User = require("../models/user-model");

CommentMedia.belongsTo(User, { foreignKey: "user_id" });

// création d'un commentaire
exports.createCommentMedia = (req, res, next) => {
  CommentMedia.create({
    user_id: req.body.user_id,
    mediapost_id: req.body.mediapost_id,
    content: req.body.content,
  })
    .then((commentMedia) => res.status(201).json(commentMedia))
    .catch((error) => res.status(400).json({ error }));
};

// Suppression d'un commentaire //
exports.deleteCommentmedia = (req, res, next) => {
  CommentMedia.findOne({ where: { id: req.params.id } })
    .then((commentMedia) => {
      CommentMedia.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "commentaire supprimé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//-----modifier un commentaire-----
exports.modifyCommentMedia = (req, res, next) => {
  CommentMedia.findOne({ where: { id: req.params.id } })
    .then(() => {
      CommentMedia.update(
        { commentMedia: req.body.commentMedia },
        { where: { id: req.params.id } }
      )
        .then(() => {
          res.status(201).json({ message: " Commentaire modifié" });
        })
        .catch((error) => {
          res.status(404).json({ error });
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

//récupérer tous les commentaires.
exports.getAllCommentsMedia = (req, res, next) => {
  CommentMedia.findAll({
    include: [{ model: User }],
    order: [["id", "DESC"]],
  })
    .then((commentMedia) => {
      res.status(200).json(commentMedia);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//récupérer un commentaire.
exports.getOneCommentMedia = (req, res, next) => {
  CommentMedia.findOne({ where: { id: req.params.id } })
    .then((commentMedia) => {
      res.status(200).json(commentMedia);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};
