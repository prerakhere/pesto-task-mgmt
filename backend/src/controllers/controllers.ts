import { Request, Response } from "express";
import TaskRepository from "../repositories/TaskRepository";
import TaskService from "../services/TaskService";

const taskService = new TaskService(new TaskRepository());

async function getAllTasks(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const allTaskItems = await taskService.getAllTasks(userId);
    if (allTaskItems) res.json({ allTaskItems });
    throw new Error("no tasks found");
  } catch (e: any) {
    console.log("getAllTasks ", e);
    res.status(500).json({ error: '500 getAllTasks' });
  }
}


async function createTask(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const { title, description, status, dueDate = null } = req.body;
    const taskParams = {
      title: JSON.stringify(title),
      description: JSON.stringify(description),
      status: JSON.stringify(status),
      dueDate: dueDate
    };
    const taskId = await taskService.createTask(userId, taskParams);
    if (!taskId) throw new Error("500 task not created: createTask controller");
    res.json({ message: 'Task created', taskId: taskId });
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
      title: JSON.stringify(title),
      description: JSON.stringify(description),
      status: JSON.stringify(status),
      dueDate: dueDate
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
    const isTaskDeleted = await taskService.deleteTask(taskId);
    if (!isTaskDeleted) throw new Error("delete task failed");
  } catch (e) {
    console.log("deleteTaskItems ", e);
    res.status(500).json({ error: '500 deleteTask' });
  }
}


export {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask
};
