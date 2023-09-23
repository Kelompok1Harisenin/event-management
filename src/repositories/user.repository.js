const { Sequelize } = require('sequelize');
const sequelize = require('../config/database');
const { User } = require('../models');
const baseRepository = require('./base.repository');

const findByEmail = (email) => {
  return User.findOne({ where: { email } });
};

const findOneWithRoleAndPermissions = (userId) => {
  return sequelize.query(
    `
    SELECT u.id, u."name", u.email,
           jsonb_agg(DISTINCT r."name") AS role,
           jsonb_agg(DISTINCT p."action") AS action,
           u."createdAt", u."updatedAt"
    FROM users u
    JOIN user_roles ur ON u.id = ur."userId"
    JOIN roles r ON r.id = ur."roleId"
    JOIN role_permissions rp ON rp."roleId" = ur."roleId"
    JOIN permissions p ON rp."permissionId" = p.id
    WHERE u.id = :userId
    GROUP BY u.id, u."name", u.email, u."createdAt", u."updatedAt"
    `,
    {
      replacements: { userId }, // Parameter binding for :userId
      type: Sequelize.QueryTypes.SELECT, // Query type for selecting data
    }
  );
};

module.exports = {
  ...baseRepository,
  findByEmail,
  findOneWithRoleAndPermissions,
};
