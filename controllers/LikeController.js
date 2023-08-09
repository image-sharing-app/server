const e = require("cors");
const { Image, Like } = require("../models");

class LikeController {
  static async addLike(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { imageId } = req.params;

      const findImage = await Image.findOne({
        where: {
          user_id: id,
          id: imageId,
        },
      });

      if (findImage) {
        const data = await Like.create({
          user_id: id,
          image_id: imageId,
        });
        res.status(201).json({ message: "Successfully like!" });
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteLike(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { imageId, likeId } = req.params;

      const findLike = await Like.findOne({
        where: {
          id: likeId,
          user_id: id,
          image_id: imageId,
        },
      });

      if (findLike) {
        const data = await Like.destroy({
          where: {
            id: likeId,
            user_id: id,
            image_id: imageId,
          },
        });
        res.status(200).json({ message: "Successfully unlike!" });
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LikeController;
