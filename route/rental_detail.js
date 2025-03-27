const express = require("express");
const router = express.Router();
const detailController = require("../controller/rental_detail");
const { authMiddleware } = require("../middleware/auth");

router
  .route("/")
  .get(authMiddleware(), detailController.getRentalDetails)
  .post(authMiddleware(), detailController.createRentalDetail);

router
  .route("/:id")
  .get(authMiddleware(["user", "admin"]), detailController.getRentalDetailById)
  // .put(authMiddleware(["admin"]), detailController.updateRentalStatus)
  .put(authMiddleware(["admin"]), detailController.updateRentalDetail)
  .delete(authMiddleware(["admin"]), detailController.deleteRentalDetail);

// Tambahkan endpoint untuk user rentals
router.get(
  "/user/:id",
  authMiddleware(["user", "admin"]),
  detailController.getUserRentals
);

// router.put(
//   "/:id/status",
//   authMiddleware(["user", "admin"]),
//   detailController.updateRentalStatus
// );
// Endpoint alternatif dengan parameter id (jika diperlukan)
// router.get("/user/:id", authMiddleware(["user", "admin"]), detailController.getUserRentalsByUserId);

module.exports = router;
