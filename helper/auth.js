const jsonWebToken = require("jsonwebtoken");

// Function to extract token from Authorization header
exports.getTokenFromHeaders = (headers) => {
  const { authorization } = headers;

  if (!authorization || authorization === "") {
    throw new Error("Unauthorized: Missing Authorization header");
  }

  const splittedAuth = authorization.split(" ");

  if (splittedAuth.length !== 2) {
    throw new Error("Unauthorized: Invalid Authorization format");
  }

  if (splittedAuth[0] !== "Bearer") {
    throw new Error("Unauthorized: Expected Bearer token");
  }

  const token = splittedAuth[1];

  return token;
};

// Function to verify and decode JWT token
exports.extractToken = (token) => {
  try {
    const decoded = jsonWebToken.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (error) {
    // Handle specific JWT errors such as token expiration
    if (error.name === "TokenExpiredError") {
      throw new Error("Unauthorized: Token has expired");
    }
    if (error.name === "JsonWebTokenError") {
      throw new Error("Unauthorized: Invalid token");
    }
    throw new Error("Unauthorized: Failed to verify token");
  }
};
