const { Token } = require('../models');
const tokenTypes = require('../config/token');

const findRefreshToken = (refreshToken) => {
  return Token.findOne({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  });
};

module.exports = {
  findRefreshToken,
};
