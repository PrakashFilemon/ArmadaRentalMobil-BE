const express = require("express");
const router = express.Router();
const auth = require("./auth");
const car = require("./car");
const rental = require("./rental");
const payment = require("./payment");
const detail = require("./rental_detail");

router.use("/auth", auth);
router.use("/car", car);
router.use("/rental", rental);
router.use("/payment", payment);
router.use("/detail", detail);
module.exports = router;
