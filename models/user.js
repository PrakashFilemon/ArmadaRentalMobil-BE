"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.rental, { foreignKey: "user_id" });
      user.hasMany(models.rental_detail, { foreignKey: "user_id" });
    }
  }
  user.init(
    {
      name: DataTypes.STRING,
      email: {
        unique: true,
        type: DataTypes.STRING,
      },
      password: DataTypes.TEXT,
      image: DataTypes.TEXT,
      phoneNumber: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
      role: DataTypes.ENUM("user", "admin"),
    },
    {
      sequelize,
      modelName: "user",
      paranoid: true,
    }
  );
  return user;
};
