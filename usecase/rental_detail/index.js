const detailRepo = require("../../repository/rental_detail");

exports.getRentalDetails = async () => {
  const data = await detailRepo.getRentalDetails();
  return data;
};

exports.getRentalDetailById = async (id) => {
  const data = await detailRepo.getRentalDetailById(id);
  return data;
};

exports.createRentalDetail = async (payload) => {
  const { rental_id, user_id, car_id } = payload;

  const data = await detailRepo.createRentalDetail({
    rental_id,
    user_id,
    car_id,
  });
  return data;
};

exports.updateRentalStatus = async (id, status) => {
  // Hanya mengupdate field status
  await detailRepo.updateRentalDetail(id, { status });

  const data = await detailRepo.getRentalDetailById(id);
  return data;
};

exports.deleteRentalDetail = async (id) => {
  const data = await detailRepo.deleteBookingDetail(id);
  return data;
};

// Tambahkan fungsi baru untuk mendapatkan detail berdasarkan user_id
exports.getRentalDetailsByUserId = async (userId) => {
  const data = await detailRepo.getRentalDetailsByUserId(userId);
  return data;
};

// Tambahkan fungsi untuk mendapatkan detail berdasarkan id dan user_id
exports.getRentalDetailByIdAndUserId = async (id, userId) => {
  const data = await detailRepo.getRentalDetailByIdAndUserId(id, userId);
  return data;
};

// Tambahkan fungsi untuk memeriksa kepemilikan
exports.checkRentalDetailOwnership = async (id, userId) => {
  const detail = await detailRepo.getRentalDetailById(id);
  if (!detail) return false;
  return detail.user_id === userId;
};

// Menambahkan fungsi untuk update status rental
// exports.updateRentalStatus = async (id, status) => {
//   try {
//     // Cari detail rental berdasarkan id
//     const rentalDetail = await detailRepo.getRentalDetailById(id, payload);

//     if (!rentalDetail) {
//       throw {
//         message: "Rental detail not found",
//         statusCode: 404,
//       };
//     }

//     // Update hanya field status
//     await rentalDetail.update({ status });

//     // Ambil data yang telah diupdate dengan relasinya
//     const updatedDetail = await detailRepo.getRentalDetailById(id, {
//       include: [
//         {
//           model: Rental,
//           as: "rental",
//         },
//         {
//           model: User,
//           as: "user",
//         },
//         {
//           model: Car,
//           as: "car",
//         },
//       ],
//     });

//     return updatedDetail;
//   } catch (error) {
//     throw error;
//   }
// };
