"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rentals", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      rentalCode: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
      },
      car_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "cars",
          },
          key: "id",
        },
      },
      namaPengemudi: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      phoneNumber: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      image: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      rentalDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      returnDate: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      total: {
        allowNull: false,
        type: Sequelize.DECIMAL(10, 2),
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
    await queryInterface.dropTable("rentals");
  },
};
