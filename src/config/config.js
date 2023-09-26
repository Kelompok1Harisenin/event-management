const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('development', 'production').required(),
    HOST: Joi.string().default('http://localhost'),
    PORT: Joi.number().default(3000),
    POSTGRES_URL: Joi.string().required().description('PostgreSQL db url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_DAYS: Joi.number()
      .default(3)
      .description('days after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
      .default(30)
      .description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    SUPABASE_URL: Joi.string().required(),
    SUPABASE_API_KEY: Joi.string().required(),
    SUPABASE_BUCKET: Joi.string().required(),
    MIDTRANS_API_URL: Joi.string().required(),
    MIDTRANS_MERCHANT_ID: Joi.string().required(),
    MIDTRANS_CLIENT_KEY: Joi.string().required(),
    MIDTRANS_SERVER_KEY: Joi.string().required(),
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
  postgres: {
    url: envVars.POSTGRES_URL,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationDays: envVars.JWT_ACCESS_EXPIRATION_DAYS,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
  supabase: {
    url: envVars.SUPABASE_URL,
    apiKey: envVars.SUPABASE_API_KEY,
    bucket: envVars.SUPABASE_BUCKET,
  },
  midtrans: {
    url: envVars.MIDTRANS_API_URL,
    merchantId: envVars.MIDTRANS_MERCHANT_ID,
    clientKey: envVars.MIDTRANS_CLIENT_KEY,
    serverKey: envVars.MIDTRANS_SERVER_KEY,
  },
};
