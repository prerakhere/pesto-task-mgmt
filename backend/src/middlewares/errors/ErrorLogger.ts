import { Request, Response, NextFunction } from "express";
import BaseError from "../../utils/ErrorHandler";

const errorLogger = (err: BaseError, request: Request, response: Response, next: NextFunction) => {
  console.log(`errorLogger: ${err.message}`);
  next(err);
};

export default errorLogger;