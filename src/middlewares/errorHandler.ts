import { Request, Response, NextFunction } from 'express';
import { ErrorTracker } from './errorTracker';

const errorHandler = (err: ErrorTracker,req: Request,res: Response,next: NextFunction) => {
  if(!err.statusCode){
    err.statusCode = 500
  }
  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};

export default errorHandler;