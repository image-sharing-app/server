"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Image.belongsToMany(models.User, {
        through: models.Like,
        as: "ImageLike",
        foreignKey: "image_id",
      });
      Image.belongsToMany(models.User, {
        through: models.Comment,
        as: "ImageComment",
        foreignKey: "image_id",
      });
    }
  }
  Image.init(
    {
      user_id: DataTypes.INTEGER,
      image_url: DataTypes.STRING,
      caption: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Image",
      timestamps: true,
    }
  );
  return Image;
};
