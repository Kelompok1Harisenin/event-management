const app = require('./app');
const config = require('./config/config');
const sequelize = require('./config/database');

let server;

sequelize.sync().then(() => {
  console.log(`Connected to postgre db ${config.postgres.url}`);
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
  console.log('SIGTERM received');
  if (server) {
    server.close();
  }
});

// Event listener for process exit
process.on('exit', () => {
  console.log('Process exited');
});

// Event listener for SIGINT signal
process.on('SIGINT', () => {
  // Perform cleanup actions or graceful shutdown
  console.log('Process terminated');
  process.exit(0);
});
