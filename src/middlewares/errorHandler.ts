import { Request, Response, NextFunction } from 'express';
import { ErrorTracker } from './errorTracker';
import { NODE_ENV } from '../config/config';

const errorHandler = (err: ErrorTracker,req: Request,res: Response,next: NextFunction) => {
  if(NODE_ENV=="DEVELOPMENT"){

    console.log(err)

    if(!err.statusCode){
      err.statusCode = 500
    }
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });

  } else {

    if(!err.statusCode){
      err.statusCode = 500
    }
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });

  }
};

export default errorHandler;