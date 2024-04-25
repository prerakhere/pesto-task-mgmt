import express from 'express';
import {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
} from "../controllers/controllers";


const router = express.Router({ mergeParams: true });


router.get('/task', getAllTasks);

router.post('/task', createTask);

router.put('/:taskId', updateTask);

router.delete('/:taskId', deleteTask);

export default router;