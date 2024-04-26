import supabase from "../../config/db-config";
import Task from "../domain/interfaces/ITask";
import ITaskRepository from "./ITaskRepository";

// interface Task {
//   id: number;
//   title: string;
//   description: string;
//   status: string;
//   // dueDate: any;
// }

export default class TaskRepository implements ITaskRepository {
  async getAllTasks(userId: string): Promise<Task[]> {
    try {
      console.log("here...");
      const { error, data } = await supabase.from('task').select();
      if (error) throw new Error("can't fetch tasks");
      const allTasks: Task[] = [];
      if (data.length) {
        data.map((taskObj) => {
          const task = {
            id: taskObj.id,
            title: taskObj.title,
            description: taskObj.description,
            status: taskObj.status
          };
          allTasks.push(task);
        });
      }
      return allTasks;
    } catch (err) {
      console.log("getAllTasks repository ", err);
      return [];
    }
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