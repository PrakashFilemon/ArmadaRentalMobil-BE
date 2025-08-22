require("dotenv").config();
console.log("🚀 Serverless function started");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DB URL exists:", !!process.env.DATABASE_URL);

const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const router = require("./route");

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: process.env.NODE_ENV === "development" ? "./tmp" : "/tmp",
  })
);

app.use(express.static("public"));

app.use("/api", router);

app.use("*", (req, res) => {
  res.status(404).json({
    data: null,
    message: "Route not found",
  });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err.statusCode) {
    statusCode = err.statusCode;
  }
  if (err.message) {
    message = err.message;
  }

  res.status(statusCode).json({
    data: null,
    message,
  });
});
console.log("🔎 Environment Variables Check");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
console.log("CLOUDINARY_URL exists:", !!process.env.CLOUDINARY_URL);
console.log("PORT:", process.env.PORT);

// ❌ jangan pakai app.listen() di Vercel
// ✅ ekspor app untuk Vercel handler
module.exports = app;

// require("dotenv").config();

// const express = require("express");
// const fileUpload = require("express-fileupload");
// const cors = require("cors");
// const router = require("./route");

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(cors());
// app.use(express.json());
// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: process.env.NODE_ENV === "development" ? "./tmp" : "/tmp",
//   })
// );

// app.use(express.static("public"));

// app.use("/api", router);

// app.use("*", (req, res) => {
//   res.status(404).json({
//     data: null,
//     message: "Route not found",
//   });
// });

// // eslint-disable-next-line no-unused-vars
// app.use((err, req, res, next) => {
//   let statusCode = 500;
//   let message = "Internal Server Error";

//   if (err.statusCode) {
//     statusCode = err.statusCode;
//   }
//   if (err.message) {
//     message = err.message;
//   }

//   res.status(statusCode).json({
//     data: null,
//     message,
//   });
// });

// module.exports = app;
