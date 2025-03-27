const bcrypt = require("bcrypt");
const crypto = require("crypto");
const path = require("path");
const { user } = require("../../models");
const { uploader } = require("../../helper/cloudinary");
const axios = require("axios");

exports.createUser = async (payload) => {
  // check if the email already exists
  const existingUser = await user.findOne({
    where: { email: payload.email },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  // encrypt the password
  payload.password = bcrypt.hashSync(payload.password, 10);

  //upload image to cloudinary
  if (payload.image) {
    const { image } = payload;

    image.publicId = crypto.randomBytes(16).toString("hex");

    image.name = `${image.publicId}${path.parse(image.name).ext}`;

    const imageUpload = await uploader(image);
    payload.image = imageUpload.secure_url;
  }
  // Save To DB
  const data = await user.create(payload);

  return data;
};

exports.getProfiles = async (id) => {
  const data = await user.findOne({
    where: { id },
  });
  if (!data) {
    throw new Error(`User is not found!`);
  }
  return data;
};

exports.getUserByEmail = async (email) => {
  //Get data From DB
  const data = await user.findOne({
    where: {
      email,
    },
  });
  if (!data) {
    throw new Error(`User with email ${email} is Not Found`);
  }

  return data.dataValues;
};

exports.getGoogleAccessTokenData = async (accessToken) => {
  const response = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
  );
  return response.data;
};
