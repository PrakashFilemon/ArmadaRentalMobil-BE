const {
  createUser,
  login,
  profile,
  googleLogin,
} = require("../../usecase/auth");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    const image = req?.files?.image;
    if (!name || name == "") {
      return next({
        message: "Name must be filled!",
        statusCode: 400,
      });
    }
    if (!email || email == "") {
      return next({
        message: "Email must be filled!",
        statusCode: 400,
      });
    }
    if (!password || password == "") {
      return next({
        message: "Password must be filled!",
        statusCode: 400,
      });
    }
    if (!phoneNumber || phoneNumber == "") {
      return next({
        message: "Phone number must be filled!",
        statusCode: 400,
      });
    }

    const data = await createUser({
      name,
      email,
      password,
      image,
      phoneNumber,
    });

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || email == "") {
      return next({
        message: "Email Must be filled!!",
        statusCode: 400,
      });
    }

    if (!password || password == "") {
      return next({
        message: "Password Must be filled!!",
        statusCode: 400,
      });
    }

    //Login Logic
    const data = await login({ email, password });

    res.status(200).json({
      message: "Login Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.googleLogin = async (req, res, next) => {
  try {
    // Get AccesToken Body
    const { accesToken } = req.body;

    if (!accesToken) {
      return next({
        statusCode: 400,
        message: "Acces Token must be provided",
      });
    }

    // login with google logic

    res.status(200).json({
      message: "Success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

exports.profile = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const data = req.user;

    res.status(200).json({
      message: "User Profile retrieved successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};
