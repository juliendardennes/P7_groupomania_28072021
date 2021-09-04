const Media = require("../models/mediapost-model");
const media = require("../routes/mediapost-route");

// création d'un post media
exports.createMedia = (req, res, next) => {
  Media.create({
    user_id: req.body.user_id,
    media:
      req.protocol + "://" + req.get("host") + "/images/" + req.file.filename,
  })
    .then((media) => res.status(201).json(media))
    .catch((error) => res.status(400).json({ error }));
};

// Suppression d'un post media //
exports.deleteMedia = (req, res, next) => {
  Media.findOne({ where: { id: req.params.id } })
    .then((media) => {
      const filename = media.media.split("/images/")[1];
      fs.unlink("images/" + filename, () => {
        Media.destroy({ where: { id: req.params.id } })
          .then(() =>
            res.status(200).json({ message: " le post a été supprimé!" })
          )
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

//-----modifier un post media-----
exports.modifyMedia = (req, res, next) => {
  Media.findOne({ where: { id: req.params.id } })
    .then((media) => {
      const filename = post.media.split("/images/")[1];
      fs.unlink("images/" + filename, () => {
        Media.update(
          {
            title: req.body.title,
            message: req.body.message,
            media:
              req.protocol +
              "://" +
              req.get("host") +
              "/images/" +
              req.file.filename,
          },
          { where: { id: req.params.id } }
        )
          .then(() => {
            res.status(201).json({ message: "l'image est à jour" });
          })
          .catch((error) => {
            res.status(404).json({ error });
          });
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

//---récupérer tous les posts média
exports.getAllMedias = (req, res, next) => {
  Media.findAll({ order: [["id", "DESC"]] })
    .then((media) => {
      res.status(200).json(media);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//---récupérer un post média
exports.getOneMedia = (req, res, next) => {
  Media.findOne({ where: { id: req.params.id } })
    .then((media) => {
      res.status(200).json(media);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};
