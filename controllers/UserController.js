require("dotenv").config();
const { User, Image } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  static async userProfile(req, res, next) {
    try {
      const { id } = req.userLogged;
      const data = await User.findOne({
        where: { id },
        include: [
          {
            model: Image,
          },
        ],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req, res, next) {
    try {
      const { id } = req.userLogged;

      const { name, username } = req.body;

      const findUser = await User.findOne({ where: { id } });

      if (findUser) {
        const data = await User.update(
          {
            name,
            username,
          },
          { where: { id } }
        );
        res.status(200).json({ message: "Successfully update data!" });
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async changePicture(req, res, next) {
    try {
      const { id } = req.userLogged;
      const findUser = await User.findOne({ where: { id } });

      if (findUser) {
        const file = `http://localhost:${process.env.PORT}/uploads/picture/${req.file.filename}`;
        const data = await User.update(
          {
            picture_url: file,
          },
          { where: { id } }
        );
        res.status(200).json({ message: "Successfully change picture!" });
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { name, username, email, password } = req.body;

      const uniqueEmail = await User.findOne({
        where: {
          email,
        },
      });

      if (!uniqueEmail) {
        const data = await User.create({
          name,
          username,
          email,
          password,
        });
        res
          .status(201)
          .json({ ...data.dataValues, message: "Successfully register!" });
      } else {
        throw { name: "UserExist" };
      }
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const findUser = await User.findOne({
        where: { email },
      });

      if (findUser) {
        const comparePassword = await bcrypt.compare(
          password,
          findUser.password
        );
        if (comparePassword) {
          const token = jwt.sign(
            {
              id: findUser.id,
              name: findUser.name,
              email: findUser.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
          );
          res.status(200).json({
            token,
            id: findUser.id,
          });
        } else {
          throw { name: "WrongPassword" };
        }
      } else {
        throw { name: "ErrorNotFound" };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
