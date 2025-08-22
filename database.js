require("dotenv").config();

module.exports = {
  development: {
    username: process.env.POSTGRES_USERNAME,
    password: decodeURIComponent(process.env.POSTGRES_PASSWORD),
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT || 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // wajib untuk Neon
      },
    },
    logging: false,
  },
  test: {
    username: process.env.POSTGRES_USERNAME,
    password: decodeURIComponent(process.env.POSTGRES_PASSWORD),
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT || 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  },
  production: {
    username: process.env.POSTGRES_USERNAME,
    password: decodeURIComponent(process.env.POSTGRES_PASSWORD),
    database: process.env.POSTGRES_DATABASE,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT || 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  },
};
