const crypto = require("crypto");
const { car } = require("../../models");
const path = require("path");
const { uploader } = require("../../helper/cloudinary");

exports.getCar = async (id) => {
  const data = await car.findOne({
    where: {
      id,
    },
  });

  return data;
};

exports.getAllCar = async () => {
  const data = await car.findAll();
  return data;
};

exports.createCar = async (payload) => {
  if (payload.image) {
    const { image } = payload;

    image.publicId = crypto.randomBytes(16).toString("hex");
    uploader(payload.image);

    image.name = `${image.publicId}${path.parse(image.name).ext}`;

    const imageUpload = await uploader(image);
    payload.image = imageUpload.secure_url;
  }
  const data = await car.create(payload);

  return data;
};

exports.updateCar = async (id, payload) => {
  const isCarExist = await car.findOne({
    where: {
      id,
    },
  });
  if (!isCarExist) {
    throw new Error("Car not found");
  }

  // check if the user wants to update their image
  if (payload.image) {
    const { image } = payload;
    image.publicId = crypto.randomBytes(16).toString("hex");
    image.name = `${image.publicId}${path.parse(image.name).ext}`;

    const imageUpload = await uploadToCloudinary(image);
    payload.image = imageUpload.secure_url;
  }

  //Update Car Data
  const data = await car.update(payload, {
    where: {
      id,
    },
    returning: true,
    plain: true,
  });

  return data[1].dataValues;
};

exports.deleteCar = async (id, payload) => {
  await car.destroy({ where: { id } });

  const data = await car.findOne(payload, {
    where: {
      id,
    },
  });
  return data;
};
