import Task from "../repositories/response-contracts/ITask";
import TaskRepository from "../repositories/TaskRepository";

export default class TaskService {
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }


  async getAllTasks(userId: string) {
    try {
      const allTasks = await this.taskRepository.getAllTasks(userId);
      return allTasks;
    } catch (err) {
      throw err;
    }
  }

  async getTaskById(taskId: string) {
    try {
      const task = await this.taskRepository.getTaskById(taskId);
      return task;
    } catch (err) {
      throw err;
    }
  }

  async createTask(userId: string, newTask: Task) {
    try {
      const createdTask = this.taskRepository.createTask(userId, newTask);
      return createdTask;
    } catch (err) {
      throw err;
    }
  }

  async updateTask(taskId: string, taskToBeUpdated: Task) {
    try {
      const updatedTask = this.taskRepository.updateTask(taskId, taskToBeUpdated);
      return updatedTask;
    } catch (err) {
      throw err;
    }
  }

  async deleteTask(taskId: string) {
    try {
      const deletedTask = this.taskRepository.deleteTask(taskId);
      return deletedTask;
    } catch (err) {
      throw err;
    }
  }
}