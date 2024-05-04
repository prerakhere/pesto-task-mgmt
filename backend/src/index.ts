import express, { NextFunction, Request, Response } from "express";
import taskRoutes from './routes/TaskRoutes';
import userRoutes from './routes/UserRoutes';
import cors from 'cors';
import errorLogger from "./middlewares/errors/ErrorLogger";
import errorResponder from "./middlewares/errors/ErrorResponder";
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


app.use(errorLogger);
app.use(errorResponder);


app.listen(PORT, () => console.log(`port started on ${PORT}`));