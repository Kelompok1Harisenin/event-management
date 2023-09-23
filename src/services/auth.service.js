const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const { User, UserRoles } = require('../models');
const { userRepository, tokenRepository, roleRepository } = require('../repositories');
const { messages, roles, ApiError } = require('../utils');

/**
 * Register
 * @param {Object} data
 */
const register = async (data) => {
  const { name, email, password } = data;

  // Check if the email is already taken
  const isEmailTaken = await userRepository.findByEmail(email);
  if (isEmailTaken) {
    throw new ApiError(httpStatus.BAD_REQUEST, messages.EMAIL_TAKEN);
  }

  // TODO: need refactor
  try {
    // Create the user
    const newUser = await User.create({
      name,
      email,
      password,
    });

    // Assign `attendee` as default role to the user
    const defaultRole = await roleRepository.findRole(roles.ATTENDEE);
    if (defaultRole) {
      // Create the association between the user and the `attendee` role
      await UserRoles.create({
        userId: newUser.id,
        roleId: defaultRole.id,
      });
    }

    const result = { ...newUser.dataValues };
    delete result.password;

    return result;
  } catch (error) {
    // Handle any errors during user creation
    throw new ApiError(httpStatus.CONFLICT, error.message);
  }
};

/**
 * Login
 * @param {Object} data
 */
const login = async (data) => {
  const { email, password } = data;

  const user = await userRepository.findByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, messages.USER_NOT_FOUND);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new ApiError(httpStatus.UNAUTHORIZED, messages.INCORRECT_CREDENTIALS);
  }

  const [userData] = await userRepository.findOneWithRoleAndPermissions(user.dataValues.id);

  return userData || {};
};

/**
 * Logout
 * @param {string} refreshToken
 */
const logout = async (refreshToken) => {
  const userRefreshToken = await tokenRepository.findRefreshToken(refreshToken);
  if (!userRefreshToken) {
    throw new ApiError(httpStatus.NOT_FOUND, messages.TOKEN_NOT_FOUND);
  }
  await userRefreshToken.destroy();
};

module.exports = {
  register,
  login,
  logout,
};
