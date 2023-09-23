const httpStatus = require('http-status');
const { Organizer, Package, User } = require('../models');
const { organizerRepository, packageRepository, userRepository } = require('../repositories');
const { ApiError, messages } = require('../utils');

const createOrganizer = async (data) => {
  const { userId, packageId } = data;

  const organizer = await organizerRepository.findByUser(userId);
  if (organizer) {
    throw new ApiError(httpStatus.BAD_REQUEST, messages.RECORD_TAKEN);
  }

  const user = await userRepository.findById(User, userId);
  const packageData = await packageRepository.findById(Package, packageId);
  if (!(user && packageData)) {
    throw new ApiError(httpStatus.BAD_REQUEST, messages.PACKAGE_USER_NOT_FOUND);
  }

  const organizerData = await Organizer.create({
    userId: user.id,
    packageId: packageData.id,
  });

  return organizerData;
};

const getOrganizers = async () => {
  let organizers = await organizerRepository.findAllWithUserAndPackage();

  organizers = organizers.map((organizer) => ({
    ...organizer.toJSON(),
    user: organizer.user.name,
    package: organizer.package.name,
  }));

  return organizers;
};

module.exports = {
  createOrganizer,
  getOrganizers,
};
