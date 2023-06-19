const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const sequelize = require('../config/database');
const { User, Role, UserRoles } = require('../models');
const ApiError = require('../utils/ApiError');
const messages = require('../utils/constants/messages');
const roles = require('../utils/constants/roles');

/**
 * Register
 * @param {Object} data
 */
const register = async (data) => {
  const { name, email, password } = data;

  // Check if the email is already taken
  const isEmailTaken = await User.findOne({ where: { email } });
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
    const defaultRole = await Role.findOne({ where: { name: roles.ATTENDEE } });
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

module.exports = {
  register,
};
