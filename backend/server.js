import app from './app.js';
import dotenv from 'dotenv';
import connectDatabase from './db/index.js';
import cloudinary from 'cloudinary';

process.on('uncaughtException', (err) => {
  console.log('Error: ', err.message);
  console.log('Shutting down the server for handling uncaught exception');
});

if (process.env.NODE_ENV !== 'PRODUCTION') {
  dotenv.config();
}

connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINATY_NAME,
  api_key: process.env.CLOUDINATY_API_KEY,
  api_secret: process.env.CLOUDINATY_API_SECRET,
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`Shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
