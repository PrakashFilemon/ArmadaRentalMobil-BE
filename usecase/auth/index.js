const bcrypt = require("bcrypt");
const { createToken } = require("./util");
const {
  getUserByEmail,
  getGoogleAccessTokenData,
  createUser,
  getProfiles,
} = require("../../repository/auth");

exports.login = async (payload) => {
  //Get User
  const user = await getUserByEmail(payload.email);

  if (!user) {
    throw new Error(`user ${payload.email} is not found`);
  }

  // compare password
  const isValid = await bcrypt.compare(payload.password, user?.password);

  if (!isValid) {
    throw new Error(`Wrong Password`);
  }
  //delete Password
  if (user?.dataValues?.password) {
    delete user?.dataValues?.password;
  } else {
    delete user?.password;
  }

  // CreateToken
  const data = createToken(user);

  return data;
};

exports.googleLogin = async (accessToken) => {
  // validate token and get the data from google
  const googleData = await getGoogleAccessTokenData(accessToken);

  // get is there have any existing user with email
  let user = await getUserByEmail(googleData?.email);
  if (!user) {
    user = await createUser({
      email: googleData?.email,
      password: "",
      name: googleData?.name,
      picture: googleData?.picture,
    });
  }

  // Delete object password from user
  delete user?.dataValues?.password;

  // CreateToken
  const data = createToken(user);

  return data;
};

exports.createUser = async (payload) => {
  let user = await createUser(payload);

  delete user.dataValues.password;

  // CreateToken
  const data = createToken(user);

  return data;
};

exports.getProfiles = async (id) => {
  // get the user
  let user = await getProfiles(id);
  if (!user) {
    throw new Error(`User with id ${id} is not found`);
  }

  // delete password
  if (user?.dataValues?.password) {
    delete user?.dataValues?.password;
  } else {
    delete user?.password;
  }

  return user;
};
