import Task from "../response-contracts/ITask";

export default interface ITaskRepository {
  getAllTasks(userId: string): Promise<Task[]>;
  createTask(userId: string, newTask: Task): Promise<Task>;
  createTasks(userId: string, tasks: Task[]): Promise<void>;
  updateTask(taskId: string, updatedTask: Task): Promise<Task>;
  deleteTask(taskId: string): Promise<void>;
}