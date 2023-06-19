const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { authService, tokenService } = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await authService.register(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

module.exports = {
  register,
};
