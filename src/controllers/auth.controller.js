const httpStatus = require('http-status');
const { catchAsync } = require('../utils');
const { authService, tokenService } = require('../services');

const setTokenCookies = async (req, res, tokens) => {
  const options = {
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  };

  res.cookie('accessToken', tokens.access.token, { expires: tokens.access.expires, ...options });
  res.cookie('refreshToken', tokens.refresh.token, { expires: tokens.refresh.expires, ...options });
};

const register = catchAsync(async (req, res) => {
  const user = await authService.register(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const user = await authService.login(req.body);
  const tokens = await tokenService.generateAuthTokens(user);

  await setTokenCookies(req, res, tokens);

  res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  const refreshToken = req.body.refreshToken ? req.body.refreshToken : req.cookies.refreshToken;

  await authService.logout(refreshToken);

  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
};
