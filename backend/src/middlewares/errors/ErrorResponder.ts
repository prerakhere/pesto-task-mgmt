import { Request, Response, NextFunction } from "express";
import BaseError from "../../utils/ErrorHandler";

const errorResponder = (err: BaseError, request: Request, response: Response, next: NextFunction) => {
  response.status(err.httpStatusCode || 500).json({
    error: err.message || 'Internal Server Error'
  });
};

export default errorResponder;