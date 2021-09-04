const Comment = require("../models/comment-model");
const comment = require("../routes/comment-route");

// création d'un commentaire
exports.createComment = (req, res, next) => {
  Comment.create({
    user_id: req.body.user_id,
    content: req.body.content,
    title: req.body.title,
  })
    .then((comment) => res.status(201).json(comment))
    .catch((error) => res.status(400).json({ error }));
};

// Suppression d'un commentaire //
exports.deleteComment = (req, res, next) => {
  Comment.findOne({ where: { id: req.params.id } })
    .then((comment) => {
      Comment.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "commentaire supprimé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//-----modifier un commentaire-----
exports.modifyComment = (req, res, next) => {
  Comment.findOne({ where: { id: req.params.id } })
    .then((comment) => {
      Comment.update(
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
exports.getAllComments = (req, res, next) => {
  Comment.findAll({ order: [["id", "DESC"]] })
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//récupérer un commentaire.
exports.getOneComment = (req, res, next) => {
  Comment.findOne({ where: { id: req.params.id } })
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};
