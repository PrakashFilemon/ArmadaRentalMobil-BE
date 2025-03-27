const paymentRepo = require("../../repository/payment");

exports.getPayments = async () => {
  const data = await paymentRepo.getPayments();
  return data;
};

exports.getPaymentById = async (id) => {
  const data = await paymentRepo.getPaymentById(id);
  return data;
};

exports.getPaymentByTransactionId = async (transactionId) => {
  const data = await paymentRepo.getPaymentByTransactionId(transactionId);
  return data;
};

exports.getPaymentByRentalId = async (rentalId) => {
  const data = await paymentRepo.getPaymentByRentalId(rentalId);
  console.log("🚀 ~ USECASE.getPaymentByRentalId= ~ data:", data);

  return data;
};

exports.createPayment = async (payload) => {
  const data = await paymentRepo.createPayment(payload);
  return data;
};

exports.deletePayment = async (id) => {
  const data = await paymentRepo.deletePayment(id);
  return data;
};

exports.updatePayment = async (payload) => {
  const data = await paymentRepo.updatePayment(payload);
  return data;
};

exports.updatePaymentStatus = async (transactionId, payload) => {
  const data = await paymentRepo.updatePaymentStatus(transactionId, payload);
  return data;
};

exports.getRentalIdByTrxId = async (transactionId) => {
  const data = await paymentRepo.getBookingIdByTrxId(transactionId);
  return data;
};
