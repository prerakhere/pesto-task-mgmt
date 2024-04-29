import express from "express";
import taskRoutes from './routes/routes';
import cors from 'cors';
// import dotenv from 'dotenv';

// dotenv.config();
// console.log(process.env);

// // require('dotenv').config();
const app = express();
const PORT = process.env.port || 3000;
app.use(cors());
app.use(express.json());


app.get('/health', (req, res) => {
  console.log("inside health get route......request object -> ", req);
  res.status(200).json({ message: "server healthy" });
});


app.use('/api/:userId', taskRoutes);

app.get('/', (req, res) => {
  console.log("inside / get route......");
  res.json({ message: "new rrrrruuuuuuuuuaaaaaaaayyyyyiiiyy" });
});

app.listen(PORT, () => console.log(`port started on ${PORT}`));