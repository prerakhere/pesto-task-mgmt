import { Request, Response } from "express";
import TaskRepository from "../repositories/TaskRepository";
import TaskService from "../services/TaskService";

const taskService = new TaskService(new TaskRepository());

async function getAllTasks(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const allTasks = await taskService.getAllTasks(userId);
    res.json({ allTasks });
  } catch (e: any) {
    console.log("getAllTasks ", e);
    res.status(500).json({ error: '500 getAllTasks' });
  }
}

async function getTask(req: Request, res: Response) {
  try {
    const { taskId } = req.params;
    const task = await taskService.getTaskById(taskId);
    res.json({ task });
  } catch (e: any) {
    console.log("getTask ", e);
    res.status(500).json({ error: '500 getTask' });
  }
}


async function createTask(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const { title, description, status, dueDate = null } = req.body;
    const taskParams = {
      title: title,
      description: description,
      status: status,
      // dueDate: dueDate
    };
    const isTaskCreated = await taskService.createTask(userId, taskParams);
    if (!isTaskCreated) throw new Error("500 task not created: createTask controller");
    res.json({ message: 'Task created' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: '500 createTask' });
  }
}


async function updateTask(req: Request, res: Response) {
  try {
    const { taskId } = req.params;
    const { title, description, status, dueDate = null } = req.body;
    const taskParams = {
      title: title,
      description: description,
      status: status,
      // dueDate: dueDate
    };
    const isTaskUpdated = await taskService.updateTask(taskId, taskParams);
    if (!isTaskUpdated) {
      throw new Error("task update failed");
    }
    res.json({ message: 'task updated' });
  } catch (e) {
    console.log("updateTaskItems ", e);
    res.status(500).json({ error: '500 updateTask' });
  }
}


async function deleteTask(req: Request, res: Response) {
  try {
    const { taskId } = req.params;
    const deletedTask = await taskService.deleteTask(taskId);
    if (!deletedTask) throw new Error("delete task failed");
    res.json({ message: 'task deleted' });
  } catch (e) {
    console.log("deleteTaskItems ", e);
    res.status(500).json({ error: '500 deleteTask' });
  }
}


export {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};
