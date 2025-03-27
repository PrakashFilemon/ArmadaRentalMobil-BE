"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class rental extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      rental.belongsTo(models.car, { foreignKey: "car_id" });
      rental.belongsTo(models.user, { foreignKey: "user_id" });
      rental.hasMany(models.rental_detail, { foreignKey: "rental_id" });
    }
  }
  rental.init(
    {
      rentalCode: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      car_id: DataTypes.INTEGER,
      namaPengemudi: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      image: DataTypes.TEXT,
      rentalDate: DataTypes.DATE,
      returnDate: DataTypes.DATE,
      total: DataTypes.DECIMAL,

      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "rental",
      paranoid: true,
    }
  );
  return rental;
};
