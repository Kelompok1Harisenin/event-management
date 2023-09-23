const winston = require('winston');
require('winston-daily-rotate-file');
const config = require('./config');

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

const fileInfoTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/server/%DATE%/info.log',
  datePattern: 'DD-MMM-YYYY',
  level: 'info',
  format: winston.format.combine(winston.format.uncolorize()),
});

const fileErrorTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/server/%DATE%/errors.log',
  datePattern: 'DD-MMM-YYYY',
  level: 'error',
  format: winston.format.combine(winston.format.uncolorize()),
});

const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.cli({
      colors: {
        error: 'red',
        warn: 'yellow',
        info: 'blue',
        http: 'green',
        verbose: 'cyan',
        debug: 'white',
      },
    })
  ),
  handleExceptions: true,
});

const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  silent: config.env === 'test',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    enumerateErrorFormat(),
    winston.format.splat(),
    winston.format.printf(
      ({ moduleName, level, message }) => `[${moduleName}] ${level}: ${message}`
    ),
    winston.format.json()
  ),
  transports: [consoleTransport, fileInfoTransport, fileErrorTransport],
});

logger.stream = {
  write: (message) => {
    logger.http(message);
  },
};

module.exports = (name) => {
  return logger.child({ moduleName: name });
};
