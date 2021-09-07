const Post = require("../models/post-model");
const post = require("../routes/post-route");

// création d'un post
exports.createPost = (req, res, next) => {
  Post.create({
    user_id: req.body.user_id,
    title: req.body.title,
    content: req.body.content,
  })
    .then((post) => res.status(201).json(post))
    .catch((error) => res.status(400).json({ error }));
};

// Suppression d'un post //
exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      Post.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "post supprimé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

//-----modifier un post-----
exports.modifyPost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      Post.update(
        {
          title: req.body.title,
          message: req.body.message,
        },
        { where: { id: req.params.id } }
      )
        .then(() => {
          res.status(201).json({ message: "l'image est à jour" });
        })
        .catch((error) => {
          res.status(404).json({ error });
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

//récupérer tous posts.
exports.getAllPosts = (req, res, next) => {
  Post.findAll({ order: [["id", "DESC"]] })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//récupérer un post.
exports.getOnePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};
