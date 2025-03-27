const rentalRepo = require("../../repository/rental");

exports.getRental = async (id) => {
  const data = await rentalRepo.getRental(id);
  return data;
};

exports.getAllRental = async () => {
  const data = await rentalRepo.getAllRental();
  return data;
};

exports.createRental = async (payload) => {
  const data = await rentalRepo.createRental(payload);
  return data;
};

exports.updateRental = async (id, payload) => {
  await rentalRepo.updateRental(id, payload);
  const data = await rentalRepo.getRental(id);
  return data;
};

exports.deleteRental = async (id) => {
  // await rentalRepo.deleteRental(id);
  const data = await rentalRepo.deleteRental(id);
  return data;
};
