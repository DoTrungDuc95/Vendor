import CustomError from '../utils/errors.js';

export default (err, req, res, next) => {
  err.message = err.message || 'An unknown error from server';
  err.statusCode = err.statusCode || 500;

  // wrong mongodb id error
  if (err.name === 'CastError') {
    const message = `Resources not found with this id.. Invalid ${err.path}`;
    err = new CustomError(message, 400);
  }

  // duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate key ${Object.keys(err.keyValue)} Entered`;
    err = new CustomError(message, 400);
  }

  // wrong jwt error
  if (err.name === 'JsonWebTokenError') {
    const message = `Your url is invalid please try again`;
    err = new CustomError(message, 403);
  }

  // jwt expired
  if (err.name === 'TokenExpiredError') {
    const message = `Your token is expired please try again`;
    err = new CustomError(message, 403);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
