const catchAsync = require('../utils/catchAsync');
const sequelize = require('../config/database');
const { User } = require('../models');

/**
 * Register
 * @param {Object} data
 */
const register = async (data) => {
  const { name, email, password } = data;

  // Check if the email is already taken
  const isEmailTaken = await User.findOne({ where: { email } });
  if (isEmailTaken) {
    throw new Error('Email is already taken');
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
    throw new Error(error.message);
  }
};

module.exports = {
  register,
};
