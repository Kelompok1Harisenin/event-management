const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const sequelize = require('../config/database');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const messages = require('../utils/constants/messages');

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

  try {
    // Ensure table creation before registering user
    await sequelize.sync();
    // Create the user
    const newUser = await User.create({
      name,
      email,
      password,
    });

    return newUser;
  } catch (error) {
    // Handle any errors during user creation
    throw new ApiError(httpStatus.CONFLICT, error.message);
  }
};

module.exports = {
  register,
};
