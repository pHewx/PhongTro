"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.hasMany(models.Image, { foreignKey: "postId" });
      Post.belongsTo(models.User);
    }
  }
  Post.init(
    {
      title: DataTypes.STRING,
      star: DataTypes.STRING,
      price: DataTypes.STRING,
      acreage: DataTypes.STRING,
      address: DataTypes.STRING,
      description: DataTypes.TEXT,
      target: DataTypes.TEXT,
      published: DataTypes.STRING,
      userId: DataTypes.STRING,
      areaCode: DataTypes.STRING,
      priceCode: DataTypes.STRING,
      provinceCode: DataTypes.STRING,
      districtCode: DataTypes.STRING,
      categoryCode: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
