"use strict";
const { Model } = require("sequelize");
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Image, {
        foreignKey: "user_id",
      });
      User.belongsToMany(models.Image, {
        through: models.Like,
        as: "UserLike",
        foreignKey: "user_id",
      });
      User.belongsToMany(models.Image, {
        through: models.Comment,
        as: "UserComment",
        foreignKey: "user_id",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      picture_url: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          const salt = bcrypt.genSaltSync(10);
          const hashPassword = bcrypt.hashSync(user.password, salt);
          user.password = hashPassword;
        },
      },
      sequelize,
      modelName: "User",
      timestamps: true,
    }
  );
  return User;
};
