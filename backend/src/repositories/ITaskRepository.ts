import Task from "../domain/interfaces/ITask";

export default interface ITaskRepository {
  getAllTasks(userId: string): Promise<Task[]>;
  updateTask(taskId: string, updatedTask: Task): Promise<boolean>;
  deleteTask(taskId: string): Promise<boolean>;
  createTask(userId: string, newTask: Task): Promise<boolean>;
}