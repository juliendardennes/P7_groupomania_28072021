const Post = require("../models/post-model");

// création d'un post
exports.createPost = (req, res, next) => {
  const post = new Model.Post({
    userId: req.body.userId,
    title: req.body.title,
    content: req.body.content,
    attachment: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  Post.save()
    .then(() => res.status(201).json({ message: "post crée" }))
    .catch((error) => res.status(400).json({ error }));
};

// suppression d'un post
exports.deletePost = (req, res, next) => {
  Post.delete({ where: { id: req.params.id } }, (err, data) => {
    if (err) {
      return res.status(400).json({ message: " le post n'a pas été supprimé" });
    }
    res.status(200).json({ message: " Le post a été supprimé" });
  });
};

//---Modification d'un post---
exports.modifyPost = (req, res, next) => {
  const postObject = req.file
    ? {
        ...JSON.parse(req.body.post),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  posts
    .updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: " le post a été modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Récupération de tous les posts
exports.getAllPost = (req, res, next) => {
  Post.findAll({
    order: [["createdAt", "DESC"]],
  })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
