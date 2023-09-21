const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const config = require('../config/config');
const { messages, roles, ApiError } = require('../utils');

const verifyJwt = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwt.secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

const auth =
  (...requiredRights) =>
  async (req, res, next) => {
    try {
      const token = req.headers?.authorization || req.cookies?.accessToken;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, messages.NEED_AUTHENTICATE);
      }

      const decoded = await verifyJwt(token);

      req.user = decoded;

      if (requiredRights.length) {
        const userRights = requiredRights.get(decoded.role);
        const hasRequiredRights = requiredRights.every((requiredRight) =>
          userRights.includes(requiredRight)
        );

        if (!hasRequiredRights && req.params.userId !== decoded.id) {
          throw new ApiError(httpStatus.FORBIDDEN, messages.FORBIDDEN_ACCESS);
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  };

module.exports = auth;
