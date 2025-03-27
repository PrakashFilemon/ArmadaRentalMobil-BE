const express = require("express");
const router = express.Router();
const rentalController = require("../controller/rental");
const { authMiddleware } = require("../middleware/auth");

router
  .route("/")
  .get(rentalController.getAllRental)
  .post(rentalController.createRental);

router
  .route("/:id")
  .get(rentalController.getRental)
  .put(authMiddleware(), rentalController.updateRental)
  .delete(authMiddleware(), rentalController.deleteRental);

// Tambahkan route baru untuk mendapatkan tanggal yang tidak tersedia per mobil
// router
//   .route("/unavailable-dates/:id")
//   .get(rentalController.getUnavailableDates);

module.exports = router;
