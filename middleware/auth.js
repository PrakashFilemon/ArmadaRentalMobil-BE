const { getTokenFromHeaders, extractToken } = require("../helper/auth");
const { getProfiles } = require("../usecase/auth/");

exports.authMiddleware =
  (roles = []) =>
  async (req, res, next) => {
    try {
      // Get Token From Headers
      const token = getTokenFromHeaders(req?.headers);

      if (!token) {
        return next({
          message: "Access token tidak ditemukan!",
          statusCode: 401,
        });
      }

      // Extract Token to get user id
      const extractedToken = extractToken(token);

      if (!extractedToken || !extractedToken.id) {
        return next({
          message: "Token tidak valid!",
          statusCode: 401,
        });
      }

      // Get User detail by id
      const user = await getProfiles(extractedToken.id);

      if (!user) {
        return next({
          message: "User tidak ditemukan!",
          statusCode: 401,
        });
      }

      // Check Role if roles array is provided
      if (roles.length > 0 && !roles.includes(user?.role)) {
        return next({
          message: "Forbidden! Anda tidak memiliki akses.",
          statusCode: 403,
        });
      }

      // Pass the user profile to request
      req.user = user;

      next();
    } catch (error) {
      // Add more detailed error message
      const errorMessage = error.message || "Authentication failed";
      next({
        message: errorMessage,
        statusCode: 401,
        originalError: error,
      });
    }
  };
