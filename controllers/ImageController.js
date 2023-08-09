require("dotenv").config();
const { Image, User } = require("../models");
const { Op } = require('sequelize');

class ImageController {
  static async findImages(req, res, next) {
    try {
      const { caption } = req.query;
      const where = {};

      if (caption) {
        where.caption = { [Op.iLike]: `%${caption}%` };
      }

      const limit = +req.query.limit || 10;
      const page = +req.query.page || 1;
      const offset = (page - 1) * limit;

      const { count, rows } = await Image.findAndCountAll({
        where,
        limit,
        offset,
        include: [
          {
            model: User,
          },
        ],
      });
      res.status(200).json({
        totalItems: count,
        data: rows,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
      });
    } catch (error) {
      next(error);
    }
  }

  static async findImage(req, res, next) {
    try {
      const { imageId } = req.params;

      const data = await Image.findOne({
        where: { id: imageId },
        include: [
          {
            model: User,
            as: "ImageComment",
          },
          {
            model: User,
            as: "ImageLike",
          },
          {
            model: User,
          },
        ],
      });

      if (data) {
        res.status(200).json(data);
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async createImage(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { caption } = req.body;
      const file = `http://localhost:${process.env.PORT}/uploads/image/${req.file.filename}`;

      const data = await Image.create({
        user_id: id,
        image_url: file,
        caption,
      });
      res.status(201).json({ message: "Successfully upload image!" });
    } catch (error) {
      next(error);
    }
  }

  static async updateImage(req, res, next) {
    try {
      const { id } = req.userLogged;
      const { imageId } = req.params;
      const { caption } = req.body;
      const findImage = await Image.findOne({
        where: {
          user_id: id,
          id: imageId,
        },
      });

      if (findImage) {
        const data = await Image.update(
          { caption },
          { where: { user_id: id, id: imageId } }
        );
        res.status(200).json({ message: "Successfully update image!" });
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteImage(req, res, next) {
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
        const data = await Image.destroy({
          where: { user_id: id, id: imageId },
        });
        res.status(200).json({ message: "Successfully delete image!" });
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ImageController;
