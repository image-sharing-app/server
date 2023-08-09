const e = require("cors");
const { Image, Comment } = require("../models");

class CommentController {
  static async addComment(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { imageId } = req.params;
      const { comment } = req.body;

      const findImage = await Image.findOne({
        where: {
          user_id: id,
          id: imageId,
        },
      });

      if (findImage) {
        const data = await Comment.create({
          user_id: id,
          image_id: imageId,
          comment,
        });
        res.status(201).json({ message: "Successfully add comment!" });

      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteComment(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { imageId, commentId } = req.params;

      const findComment = await Comment.findOne({
        where: {
          id: commentId,
          user_id: id,
          image_id: imageId,
        },
      });

      if (findComment) {
        const data = await Comment.destroy({
          where: {
            id: commentId,
            user_id: id,
            image_id: imageId,
          },
        });
        res.status(200).json({ message: "Successfully delete comment!" });
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CommentController;
