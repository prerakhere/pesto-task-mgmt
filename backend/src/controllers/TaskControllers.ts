import { NextFunction, Request, Response } from "express";
import TaskRepository from "../repositories/TaskRepository";
import TaskService from "../services/TaskService";
import BaseError from "../utils/ErrorHandler";
import { taskValidator } from "../utils/PayloadValidators";

const taskService = new TaskService(new TaskRepository());


async function getAllTasks(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;
    if (!userId) throw new BaseError(400, "no userId provided");
    const allTasks = await taskService.getAllTasks(userId);

    // 4/27/2024, 4:55:22 PM
    // console.log(new Date(Date.parse(allTasks[0].created_at)).toLocaleString());

    // 2024-04-27T11:25:22.145Z
    // console.log(new Date(Date.parse(allTasks[0].created_at)));

    // sorting in descending order of timestamp - default of last added first
    allTasks.forEach((task) => {
      task.created_at = new Date(Date.parse(task.created_at));
    });
    allTasks.sort((t1, t2) => t2.created_at - t1.created_at);
    res.json({ allTasks });
  } catch (err) {
    next(err);
  }
}

async function getTask(req: Request, res: Response, next: NextFunction) {
  try {
    const { taskId } = req.params;
    if (!taskId) throw new BaseError(400, "no taskId provided");
    const task = await taskService.getTaskById(taskId);
    res.json({ task });
  } catch (err) {
    next(err);
  }
}


async function createTask(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;
    if (!userId) throw new BaseError(400, "no userId provided");
    const { error } = taskValidator(req.body);
    if (error) throw new BaseError(400, "invalid task payload");
    const { title, description, status } = req.body;
    const taskParams = {
      title: title,
      description: description,
      status: status
    };
    const createdTask = await taskService.createTask(userId, taskParams);
    res.json({ message: 'task created', createdTask });
  } catch (err) {
    next(err);
  }
}


async function updateTask(req: Request, res: Response, next: NextFunction) {
  try {
    const { taskId } = req.params;
    if (!taskId) throw new BaseError(400, "no taskId provided");
    const { error } = taskValidator(req.body);
    if (error) throw new BaseError(400, "invalid task payload");
    const { title, description, status } = req.body;
    const taskParams = {
      title: title,
      description: description,
      status: status
    };
    const updatedTask = await taskService.updateTask(taskId, taskParams);
    res.json({ message: 'task updated', updatedTask });
  } catch (err) {
    next(err);
  }
}


async function deleteTask(req: Request, res: Response, next: NextFunction) {
  try {
    const { taskId } = req.params;
    if (!taskId) throw new BaseError(400, "no taskId provided");
    await taskService.deleteTask(taskId);
    res.json({ message: 'task deleted' });
  } catch (err) {
    next(err);
  }
}


export {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};
