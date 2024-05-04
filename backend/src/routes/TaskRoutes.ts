import express from 'express';
import {
  getAllTasks,
  getTask,
  createTask,
  createTasks,
  updateTask,
  deleteTask
} from "../controllers/TaskControllers";


const router = express.Router({ mergeParams: true });


router.get('/task', getAllTasks);

router.get('/task/:taskId', getTask);

router.post('/task', createTask);

router.post('/tasks', createTasks);

router.put('/task/:taskId', updateTask);

router.delete('/task/:taskId', deleteTask);

export default router;