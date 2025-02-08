import { HttpError } from 'http-errors';
import { MongooseError } from 'mongoose';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      name: 'Http error',
    });
    return;
  }

  if (err instanceof MongooseError) {
    res.status(500).json({
      status: 500,
      message: err.message,
      name: 'Mongoose error',
    });
    return;
  }

  res.status(err.status).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};
