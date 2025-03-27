"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Data mobil yang akan dimasukkan ke dalam tabel cars
    await queryInterface.bulkInsert(
      "cars",
      [
        {
          brand: "Toyota",
          model: "Innova",
          transmission: "Automatic",
          image:
            "https://res.cloudinary.com/demo/image/upload/v1725949535/innova.webp",
          carYear: 2021,
          plate: "B 1234 ABC",
          seat: 7,
          color: "Silver",
          rentPerday: 350000.0,
          information:
            "Toyota Innova, ideal for family trips with comfortable seats and modern features.",
          status: "available",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brand: "Honda",
          model: "Civic",
          transmission: "Manual",
          image:
            "https://res.cloudinary.com/demo/image/upload/v1725949535/civic.webp",
          carYear: 2020,
          plate: "B 5678 DEF",
          seat: 5,
          color: "Black",
          rentPerday: 450000.0,
          information:
            "Honda Civic, a compact car known for its performance and sporty design.",
          status: "rented",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brand: "Nissan",
          model: "X-Trail",
          transmission: "Automatic",
          image:
            "https://res.cloudinary.com/demo/image/upload/v1725949535/xtrail.webp",
          carYear: 2019,
          plate: "B 9101 GHI",
          seat: 5,
          color: "Red",
          rentPerday: 500000.0,
          information:
            "Nissan X-Trail, an SUV with strong performance for city and off-road driving.",
          status: "available",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brand: "BMW",
          model: "Series 5",
          transmission: "Automatic",
          image:
            "https://res.cloudinary.com/demo/image/upload/v1725949535/bmw5series.webp",
          carYear: 2022,
          plate: "B 1122 JKL",
          seat: 5,
          color: "Blue",
          rentPerday: 750000.0,
          information:
            "BMW Series 5, a luxury sedan offering a perfect blend of comfort and performance.",
          status: "available",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          brand: "Ford",
          model: "Ranger",
          transmission: "Manual",
          image:
            "https://res.cloudinary.com/demo/image/upload/v1725949535/fordranger.webp",
          carYear: 2018,
          plate: "B 1314 MNO",
          seat: 5,
          color: "White",
          rentPerday: 550000.0,
          information:
            "Ford Ranger, a tough and reliable pickup truck suitable for rough terrains.",
          status: "repair",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // Menghapus semua data dari tabel cars
    await queryInterface.bulkDelete("cars", null, {});
  },
};
