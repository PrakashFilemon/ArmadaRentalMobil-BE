const { rental, car, user } = require("../../models");
const crypto = require("crypto");
const path = require("path");
const { uploader } = require("../../helper/cloudinary");
const { where } = require("sequelize");

exports.getRental = async (id) => {
  const data = await rental.findOne({
    where: {
      id,
    },

    include: [
      {
        model: user,
        attributes: ["id", "name", "email", "phoneNumber"],
      },
      {
        model: car,
      },
    ],
  });
  return data;
};

exports.getAllRental = async () => {
  const data = await rental.findAll({
    include: [
      {
        model: user,
        attributes: ["id", "name", "email", "phoneNumber"],
      },
      {
        model: car,
      },
    ],
  });
  return data;
};

exports.getRentalByUserId = async (user_id) => {
  const data = await rental.findAll({
    include: [
      {
        model: user,
        attributes: ["id", "name", "email", "phoneNumber"],
      },
    ],
    where: { user_id },
  });
  return data;
};

exports.createRental = async (payload) => {
  const rentalCode = crypto.randomBytes(5).toString("hex");

  if (payload.image) {
    const { image } = payload;

    image.publicId = crypto.randomBytes(16).toString("hex");
    uploader(payload.image);

    image.name = `${image.publicId}${path.parse(image.name).ext}`;

    const imageUpload = await uploader(image);
    payload.image = imageUpload.secure_url;
  }
  const data = await rental.create({ ...payload, rentalCode });
  return data;
};

exports.updateRental = async (id, payload) => {
  await rental.update(payload, { where: { id } });

  const data = await rental.findOne({
    where: {
      id,
    },
  });
  return data;
};

exports.deleteRental = async (id, payload) => {
  await rental.destroy({ where: { id } });

  const data = await rental.findOne(payload, {
    where: {
      id,
    },
  });
  return data;
};
