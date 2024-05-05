import Task from "../domain/Task";
import ITask from "../repositories/contracts/ITask";
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

  async createTask(userId: string, taskToCreate: ITask) {
    try {
      const newTask = new Task({
        title: taskToCreate.title,
        description: taskToCreate.description,
        status: taskToCreate.status
      });
      return await this.taskRepository.createTask(userId, newTask);
    } catch (err) {
      throw err;
    }
  }

  async createTasks(userId: string, tasksToCreate: ITask[]) {
    try {
      const tasks = tasksToCreate.map((taskToCreate) => {
        return new Task({
          title: taskToCreate.title,
          description: taskToCreate.description,
          status: taskToCreate.status
        });
      });
      await this.taskRepository.createTasks(userId, tasks);
    } catch (err) {
      throw err;
    }
  }

  async updateTask(taskId: string, taskToBeUpdated: ITask) {
    try {
      const task = new Task({
        title: taskToBeUpdated.title,
        description: taskToBeUpdated.description,
        status: taskToBeUpdated.status
      });
      return await this.taskRepository.updateTask(taskId, task);
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