const app = require('./app');
const config = require('./config/config');
const sequelize = require('./database/database');

let server;

sequelize.authenticate().then(() => {
  console.log(`Connected to mysql db ${config.mysql.name}`);
  server = app.listen(config.port, () => {
    console.log(`Listening to port ${config.port}`);
  });
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.log.error(error);
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
