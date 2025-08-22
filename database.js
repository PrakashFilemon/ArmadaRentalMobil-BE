require("dotenv").config();

module.exports = {
  development: {
    username: process.env.PGUSER,
    password: decodeURIComponent(process.env.PGPASSWORD),
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT || 5432,
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
    username: process.env.PGUSER,
    password: decodeURIComponent(process.env.PGPASSWORD),
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT || 5432,
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
    username: process.env.PGUSER,
    password: decodeURIComponent(process.env.PGPASSWORD),
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT || 5432,
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
