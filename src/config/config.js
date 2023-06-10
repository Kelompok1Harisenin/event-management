const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('development', 'production').required(),
    HOST: Joi.string().default('http://localhost'),
    PORT: Joi.number().default(3000),
    MYSQL_HOST: Joi.string().required().description('MySQL db host'),
    MYSQL_PORT: Joi.string().default(3306).required().description('MySQL db port'),
    MYSQL_NAME: Joi.string().required().description('MySQL db name (credentials)'),
    MYSQL_USERNAME: Joi.string().required().description('MySQL db username (credentials)'),
    MYSQL_PASSWORD: Joi.string().required().description('MySQL db password (credentials)'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  host: envVars.HOST,
  port: envVars.PORT,
  mysql: {
    host: envVars.MYSQL_HOST,
    port: envVars.MYSQL_PORT,
    name: envVars.MYSQL_NAME,
    user: envVars.MYSQL_USERNAME,
    pass: envVars.MYSQL_PASSWORD,
  },
};
