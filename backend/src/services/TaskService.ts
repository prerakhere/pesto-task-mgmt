import Task from "../domain/interfaces/ITask";
import TaskRepository from "../repositories/TaskRepository";

export default class TaskService {
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async getAllTasks(userId: string) {
    const allTasks = await this.taskRepository.getAllTasks(userId);
    return allTasks;
  }

  async createTask(userId: string, newTask: Task) {
    const isNewTaskAdded = this.taskRepository.createTask(userId, newTask);
    return isNewTaskAdded;
  }

  async updateTask(taskId: string, updatedTask: Task) {
    const isTaskUpdated = await this.taskRepository.updateTask(taskId, updatedTask);
    return isTaskUpdated;
  }

  async deleteTask(taskId: string) {
    const isTaskDeleted = this.taskRepository.deleteTask(taskId);
    return isTaskDeleted;
  }

}