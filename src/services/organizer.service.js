const httpStatus = require('http-status');
const { Organizer } = require('../models');
const { packageRepository, userRepository } = require('../repositories');
const { ApiError } = require('../utils');

const createOrganizer = async (data) => {
  const { userId, packageId } = data;

  try {
    const packageData = await packageRepository.findById(Organizer, packageId);
    const user = await userRepository.findById(userId);
    if (packageData && user) {
      await Organizer.create({
        userId: user.id,
        packageId: packageData.id,
      });
    }
  } catch (error) {
    throw new ApiError(httpStatus.CONFLICT, error.message);
  }
};

const getOrganizers = async () => {
  const organizer = await Organizer.findAll();

  return organizer;
};

module.exports = {
  createOrganizer,
  getOrganizers,
};
