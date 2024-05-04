import express, { NextFunction, Request, Response } from "express";
import taskRoutes from './routes/TaskRoutes';
import userRoutes from './routes/UserRoutes';
import cors from 'cors';
import BaseError from "./ErrorHandler";
// import dotenv from 'dotenv';

// dotenv.config();
// console.log(process.env);

// // require('dotenv').config();
const app = express();
const PORT = process.env.port || 3000;
app.use(cors());
app.use(express.json());


app.get('/health', (req, res) => {
  console.log("service healthy");
  res.status(200).json({ message: "server healthy" });
});

app.use('/api/user', userRoutes);
app.use('/api/:userId', taskRoutes);


const errorLogger = (err: BaseError, request: Request, response: Response, next: NextFunction) => {
  console.log(`errorLogger: ${err.message}`);
  next(err);
};

const errorResponder = (err: BaseError, request: Request, response: Response, next: NextFunction) => {
  response.status(err.httpStatusCode || 500).json({
    error: err.message || 'Internal Server Error'
  });
};

app.use(errorLogger);
app.use(errorResponder);


app.listen(PORT, () => console.log(`port started on ${PORT}`));