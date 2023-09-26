const app = require('./app');
const config = require('./config/config');
const sequelize = require('./config/database');
const logger = require('./config/logger')('index.js');

let server;

sequelize
  .sync()
  .then(() => {
    logger.info(`Connected to postgre db ${config.postgres.url}`);
    server = app.listen(config.port, () => {
      logger.info(`Listening to port ${config.port}`);
    });
  })
  .catch((error) => {
    logger.error('Unable to connect to the database: ', error);
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

// Event listener for process exit
process.on('exit', () => {
  logger.info('Process exited');
});

// Event listener for SIGINT signal
process.on('SIGINT', () => {
  // Perform cleanup actions or graceful shutdown
  logger.info('Process terminated');
  process.exit(0);
});
