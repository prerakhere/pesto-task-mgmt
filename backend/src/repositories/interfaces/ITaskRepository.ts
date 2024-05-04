import Task from "../response-contracts/ITask";

export default interface ITaskRepository {
  getAllTasks(userId: string): Promise<Task[]>;
  createTask(userId: string, newTask: Task): Promise<Task>;
  updateTask(taskId: string, updatedTask: Task): Promise<Task>;
  deleteTask(taskId: string): Promise<void>;
}