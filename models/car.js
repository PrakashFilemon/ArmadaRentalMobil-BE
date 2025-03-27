"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      car.hasMany(models.rental, { foreignKey: "car_id" });
      car.hasMany(models.rental_detail, { foreignKey: "car_id" });
    }
  }
  car.init(
    {
      brand: DataTypes.STRING,
      model: DataTypes.STRING,
      transmission: DataTypes.STRING,
      image: DataTypes.TEXT,
      carYear: DataTypes.INTEGER,
      plate: DataTypes.STRING,
      seat: DataTypes.INTEGER,
      color: DataTypes.STRING,
      rentPerday: DataTypes.DECIMAL,
      information: DataTypes.TEXT,
      status: DataTypes.ENUM("available", "rented", "repair"),
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "car",
      paranoid: true,
    }
  );
  return car;
};
