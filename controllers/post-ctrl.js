const Post = require("../models/post-model");
const post = require("../routes/post-route");

// création d'un post
exports.createPost = (req, res, next) => {
  Post.create({
    user_id: req.body.user_id,
    content: req.body.content,
    title: req.body.title,
  })
    .then(() => res.status(201).json({ message: "post crée" }))
    .catch((error) => res.status(400).json({ error }));
};

// Suppression d'un post //
exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      Post.destroy({ where: { id: req.params.id } }) // Méthode //
        .then(() => res.status(200).json({ message: "Post supprimé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
