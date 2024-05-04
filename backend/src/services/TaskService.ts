import Task from "../repositories/response-contracts/ITask";
import TaskRepository from "../repositories/TaskRepository";

export default class TaskService {
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }


  async getAllTasks(userId: string) {
    try {
      return await this.taskRepository.getAllTasks(userId);
    } catch (err) {
      throw err;
    }
  }

  async getTaskById(taskId: string) {
    try {
      return await this.taskRepository.getTaskById(taskId);
    } catch (err) {
      throw err;
    }
  }

  async createTask(userId: string, newTask: Task) {
    try {
      return await this.taskRepository.createTask(userId, newTask);
    } catch (err) {
      throw err;
    }
  }

  async updateTask(taskId: string, taskToBeUpdated: Task) {
    try {
      return await this.taskRepository.updateTask(taskId, taskToBeUpdated);
    } catch (err) {
      throw err;
    }
  }

  async deleteTask(taskId: string) {
    try {
      await this.taskRepository.deleteTask(taskId);
    } catch (err) {
      throw err;
    }
  }
}