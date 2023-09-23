const httpStatus = require('http-status');
const { Organizer, Package, User, UserRoles } = require('../models');
const {
  organizerRepository,
  packageRepository,
  userRepository,
  roleRepository,
} = require('../repositories');
const { ApiError, messages, roles } = require('../utils');

const createOrganizer = async (data) => {
  const { userId, packageId, description } = data;

  const organizer = await organizerRepository.findByUser(userId);
  if (organizer) {
    throw new ApiError(httpStatus.BAD_REQUEST, messages.RECORD_TAKEN);
  }

  const user = await userRepository.findById(User, userId);
  const packageData = await packageRepository.findById(Package, packageId);
  if (!(user && packageData)) {
    throw new ApiError(httpStatus.BAD_REQUEST, messages.PACKAGE_USER_NOT_FOUND);
  }

  const role = await roleRepository.findRole(roles.ORGANIZER);
  if (role) {
    // Create the association between the user and the `organizer` role
    await UserRoles.create({
      userId,
      roleId: role.id,
    });
  }

  const organizerData = await Organizer.create({
    userId: user.id,
    packageId: packageData.id,
    description,
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
