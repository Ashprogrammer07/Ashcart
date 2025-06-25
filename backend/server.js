const app = require('./app');
const connectDB = require('./config/dataBase');
connectDB();

// Handle Uncaught Exceptions
process.on('uncaughtException', (err) => {
  console.error(`Error: ${err.message}`);
  console.error('Shutting down the server due to uncaught exception');
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});



// Start the server and store in variable
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`);
  console.error('Shutting down the server due to unhandled promise rejection');

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});
