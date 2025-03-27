const express = require("express");
const router = express.Router();
const paymentController = require("../controller/payment");
const { authMiddleware } = require("../middleware/auth");

router
  .route("/")
  .get(paymentController.getPayments)
  .post(paymentController.createPayment)
  .put(paymentController.updatePayment);

router
  .route("/:rentalId")
  .get(paymentController.getPaymentByBookingId)
  .delete(paymentController.deletePayment);

module.exports = router;
