// import { Task } from "../domain/Task";
import ITaskRepository from "./ITaskRepository";

interface Task {
  title: string;
  description: string;
  status: string;
  dueDate: any;
}

export default class TaskRepository implements ITaskRepository {
  async getAllTasks(userId: string): Promise<Task[]> {
    return Promise.resolve([{
      title: 'titlee',
      description: 'desc',
      status: 'statuss',
      dueDate: 'duedate'
    }]);
  }

  async createTask(userId: string, newTask: Task): Promise<boolean> {
    return Promise.resolve(true);
  }

  async updateTask(taskId: string, updatedTask: Task): Promise<boolean> {
    return Promise.resolve(true);
  }

  async deleteTask(taskId: string): Promise<boolean> {
    return Promise.resolve(true);
  }

}