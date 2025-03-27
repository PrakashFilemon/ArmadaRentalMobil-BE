const { rental_detail, user, car, rental } = require("../../models");

exports.getRentalDetails = async () => {
  const data = await rental_detail.findAll({
    include: [
      {
        model: rental,
        as: "rental",
      },
      {
        model: user,
        as: "user",
        attributes: ["id", "name", "email", "phoneNumber"],
      },
      {
        model: car,
        as: "car",
      },
    ],
  });
  return data;
};

exports.getRentalDetailById = async (id) => {
  const data = await rental_detail.findOne({
    where: {
      id,
    },
    include: [
      {
        model: rental,
        as: "rental",
      },
      {
        model: user,
        as: "user",
        attributes: ["id", "name", "email", "phoneNumber"],
      },
      {
        model: car,
        as: "car",
      },
    ],
  });
  if (!data) {
    throw new Error(`Rental Details With id:${id} is not found`);
  }
  return data;
};

exports.getRentalDetailByRentalId = async (rental_id) => {
  const data = await rental_detail.findAll({
    where: {
      rental_id,
    },
    include: [
      {
        model: user,
        as: "user",
        attributes: ["id", "name", "email", "phoneNumber"],
      },
      {
        model: car,
        as: "car",
      },
    ],
  });
  if (!data) {
    throw new Error(`Rental Details With id:${id} is not found`);
  }
  return data;
};

exports.createRentalDetail = async (payload, t) => {
  const data = await rental_detail.create(payload, {
    transcation: t,
  });
  return data;
};

exports.updateRentalDetail = async (id, payload) => {
  // Update data
  await rental_detail.update(payload, {
    where: {
      id,
    },
  });

  // Ambil data terbaru setelah update, termasuk relasi
  const data = await rental_detail.findOne({
    where: {
      id,
    },
    include: [
      {
        model: rental,
        as: "rental",
      },
      {
        model: user,
        as: "user",
        attributes: ["id", "name", "email", "phoneNumber"],
      },
      {
        model: car,
        as: "car",
      },
    ],
  });

  return data;
};

exports.deleteBookingDetail = async (id) => {
  const data = await rental_detail.findOne({
    where: {
      id,
    },
  });

  if (!data) {
    throw new Error(`Rental Details With id:${id} is not found`);
  }

  await rental_detail.destroy({
    where: {
      id,
    },
  });

  return data;
};

// Tambahkan fungsi baru untuk mendapatkan detail rental berdasarkan user_id
exports.getRentalDetailsByUserId = async (userId) => {
  const data = await rental_detail.findAll({
    where: {
      user_id: userId,
    },
    include: [
      {
        model: rental,
        as: "rental",
      },
      {
        model: user,
        as: "user",
        attributes: ["id", "name", "email", "phoneNumber"],
      },
      {
        model: car,
        as: "car",
      },
    ],
  });
  return data;
};

// Tambahkan fungsi untuk memeriksa detail rental berdasarkan id dan user_id
exports.getRentalDetailByIdAndUserId = async (id, userId) => {
  const data = await rental_detail.findOne({
    where: {
      id,
      user_id: userId,
    },
    include: [
      {
        model: rental,
        as: "rental",
      },
      {
        model: user,
        as: "user",
        attributes: ["id", "name", "email", "phoneNumber"],
      },
      {
        model: car,
        as: "car",
      },
    ],
  });
  return data;
};
