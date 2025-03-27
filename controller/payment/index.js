const paymentUsecase = require("../../usecase/payment");
const rentalUsecase = require("../../usecase/rental");
const crypto = require("crypto");
const {
  updateStatusBasedOnMidtransResponse,
} = require("../../helper/midtrans");
const { CLIENT_URL, MIDTRANS_SERVER_KEY, MIDTRANS_APP_URL } = process.env;

exports.getPayments = async (req, res, next) => {
  try {
    const data = await paymentUsecase.getPayments();
    res.status(200).json({
      message: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.getPaymentByBookingId = async (req, res, next) => {
  try {
    const { rentalId } = req.params;

    if (rentalId) {
      const data = await paymentUsecase.getPaymentByRentalId(rentalId);
      res.status(200).json({
        message: "success",
        data,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.createPayment = async (req, res, next) => {
  try {
    const { rentalId, paymentAmount } = req.body;

    // GET USER DATA
    const user = req.user;

    // CEK APAKAH RENTAL ID SUDAH ADA PAYMENT ID
    const isRentalHasPayment =
      await paymentUsecase.getPaymentByRentalId(rentalId);

    if (isRentalHasPayment !== null) {
      return res.status(400).json({
        status: "Error",
        message: "Booking already has payment",
      });
    }
    await rentalUsecase.getRental(rentalId);
    const transaction_id = `TRX-${crypto.randomBytes(4).toString("hex")}-${crypto.randomBytes(4).toString("hex")}`;
    const gross_amount = paymentAmount;
    const authString = btoa(MIDTRANS_SERVER_KEY);

    const payload = {
      transaction_details: {
        order_id: transaction_id,
        gross_amount,
      },
      customer_details: {
        first_name: user.name,
        email: user.email,
        phone: user.phoneNumber,
      },
      item_details: item_details_data,
      callbacks: {
        finish: `${CLIENT_URL}/flight/payment/status`,
        error: `${CLIENT_URL}/flight/payment/status`,
      },
      expiry: {
        unit: "hour",
        duration: 2,
      },
    };
    const response = await fetch(`${MIDTRANS_APP_URL}/snap/v1/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    if (response.status !== 201) {
      return res.status(500).json({
        status: "error",
        message: "Payment failed",
      });
    }
    await paymentUsecase.createPayment({
      rentalId,
      paymentAmount,
      transactionId: transaction_id,
      snapToken: data.token,
      snapRedirectUrl: data.redirect_url,
    });

    res.status(200).json({
      message: "success create payment",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.deletePayment = async (req, res, next) => {
  try {
    const { rentalId } = req.params;

    if (rentalId) {
      const data = await paymentUsecase.deletePayment(rentalId);

      res.status(200).json({
        message: "success",
        data,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.updatePayment = async (req, res, next) => {
  try {
    const data = await paymentUsecase.updatePayment({ ...req.body });

    res.status(200).json({
      message: "success",
      data,
    });
  } catch (error) {}
};
