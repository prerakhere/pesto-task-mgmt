import ITask from "../contracts/ITask";
import Task from "../../domain/Task";

export default interface ITaskRepository {
  getAllTasks(userId: string): Promise<ITask[]>;
  createTask(userId: string, newTask: Task): Promise<ITask>;
  createTasks(userId: string, tasks: Task[]): Promise<void>;
  updateTask(taskId: string, updatedTask: Task): Promise<ITask>;
  deleteTask(taskId: string): Promise<void>;
}