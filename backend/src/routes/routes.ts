import express from 'express';
import {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/controllers";


const router = express.Router({ mergeParams: true });


router.get('/task', getAllTasks);

router.get('/task/:taskId', getTask);

router.post('/task', createTask);

router.put('/task/:taskId', updateTask);

router.delete('/task/:taskId', deleteTask);

export default router;