const express = require("express");
const router = express.Router();
const carController = require("../controller/car");
const { authMiddleware } = require("../middleware/auth");

router
  .route("/")
  .get(carController.getAllCar)
  .post(authMiddleware(["admin"]), carController.createCar);

router
  .route("/:id")
  .get(carController.getCar)
  .put(authMiddleware(["admin"]), carController.updateCar)
  .delete(authMiddleware(["admin"]), carController.deleteCar);

module.exports = router;
