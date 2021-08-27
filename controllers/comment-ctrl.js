const Comment = require("../models/comment-model");
const comment = require("../routes/comment-route");

// creation d'un commentaire
exports.createComment = (req, res, next) => {
  const comment = {
    userId: req.decodedToken.userId,
    postId: req.body.postId,
    content: req.body.content,
  };
  Comment.create(comment)
    .then(() => res.status(201).json({ message: "commentaire crée" }))
    .catch((error) => res.status(400).json({ error }));
};

// Suppression d'un commentaire //
exports.deleteComment = (req, res, next) => {
  Comment.findOne({ where: { id: req.params.id } })
    .then((comment) => {
      Comment.destroy({ where: { id: req.params.id } }) // Méthode //
        .then(() => res.status(200).json({ message: "commentaire supprimé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// ----modifier un commentaire-----
exports.modifyComment = (req, res, next) => {
  Comment.findOne({ where: { id: req.params.id } })
    .then((comment) => {
      const userId = req.headers.authorization.split(" ")[3];
      if (comment.userId == userId) {
        Comment.update(
          { message: req.body.message },
          { where: { id: req.params.id } }
        )
          .then(() => {
            res.status(201).json({ message: " Le commentaire a été modifié" });
          })
          .catch((error) => {
            res.status(404).json({ error: error });
          });
      } else {
        res.status(403).json({ error });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

// -------récupérer les commentaires-----
exports.getAllComments = (req, res, next) => {
  Comment.findAll({ where: { postId: req.params.id }, order: [["id", "DESC"]] })
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
