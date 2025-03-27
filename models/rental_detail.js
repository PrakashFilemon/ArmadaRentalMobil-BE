"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class rental_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      rental_detail.belongsTo(models.rental, {
        foreignKey: "rental_id",
        as: "rental",
      });
      rental_detail.belongsTo(models.user, {
        foreignKey: "user_id",
        as: "user",
      });
      rental_detail.belongsTo(models.car, {
        foreignKey: "car_id",
        as: "car",
      });
    }
  }
  rental_detail.init(
    {
      rental_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      car_id: DataTypes.INTEGER,
      status: DataTypes.ENUM("waiting", "used", "finished"),
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "rental_detail",
      paranoid: true, // Untuk soft delete
    }
  );
  return rental_detail;
};
