"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cars", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      brand: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      model: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      transmission: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      image: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      carYear: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      plate: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      seat: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      color: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      rentPerday: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
      },
      information: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      status: {
        type: Sequelize.ENUM("available", "rented", "repair"),
        allowNull: false,
        defaultValue: "available",
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("cars");
  },
};
