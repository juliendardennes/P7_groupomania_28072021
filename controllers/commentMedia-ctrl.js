const CommentMedia = require("../models/commentMedia-model");
const commentMedia = require("../routes/commentMedia-route");

// création d'un commentaire
exports.createCommentMedia = (req, res, next) => {
  CommentMedia.create({
    user_id: req.body.user_id,
    content: req.body.content,
    title: req.body.title,
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
    .then((commentMedia) => {
      CommentMedia.update(
        {
          title: req.body.title,
          message: req.body.message,
        },
        { where: { id: req.params.id } }
      )
        .then(() => {
          res.status(201).json({ message: " A jour" });
        })
        .catch((error) => {
          res.status(404).json({ error });
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

//récupérer tous les commentaires.
exports.getAllCommentsMedia = (req, res, next) => {
  CommentMedia.findAll({ order: [["id", "DESC"]] })
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
