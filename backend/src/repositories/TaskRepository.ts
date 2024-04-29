import supabase from "../../config/db-config";
import Task from "./response-contracts/ITask";
import ITaskRepository from "./interfaces/ITaskRepository";


export default class TaskRepository implements ITaskRepository {


  async getAllTasks(userId: string): Promise<Task[]> {
    try {
      const { error, data } = await supabase.from('task').select().eq('user_id', userId);
      console.log(data);
      if (error) throw new Error("getAllTasks: can't fetch tasks");
      // const allTasks: Task[] = [];
      // if (data.length) {
      //   data.map((taskObj) => {
      //     const task = {
      //       id: taskObj.id,
      //       title: taskObj.title,
      //       description: taskObj.description,
      //       status: taskObj.status
      //     };
      //     allTasks.push(task);
      //   });
      // }
      // return allTasks;
      return data;
    } catch (err: any) {
      console.log("getAllTasks repository ", err);
      throw err;
    }
  }

  async getTaskById(taskId: string) {
    try {
      const { error, data } = await supabase.from('task').select().eq('id', taskId);
      console.log(data);
      if (error) throw new Error("getTaskById: can't fetch task");
      // const allTasks: Task[] = [];
      // if (data.length) {
      //   data.map((taskObj) => {
      //     const task = {
      //       id: taskObj.id,
      //       title: taskObj.title,
      //       description: taskObj.description,
      //       status: taskObj.status
      //     };
      //     allTasks.push(task);
      //   });
      // }
      // return allTasks;
      return data[0];
    } catch (err: any) {
      console.log("getAllTasks repository ", err);
      throw err;
    }
  }

  async createTask(userId: string, newTask: Task): Promise<Task> {
    // return Promise.resolve(true);
    try {
      let createdTask: Task;
      const { data, error } = await supabase.from('task').insert({
        user_id: userId,
        title: newTask.title,
        description: newTask.description,
        status: newTask.status
      }).select();
      console.log("---------- error ", error);
      if (error) throw new Error("createTask: can't create task");
      createdTask = data[0];
      return createdTask;
    } catch (err) {
      console.log("createTask repository ", err);
      throw err;
    }
  }

  async updateTask(taskId: string, taskToBeUpdated: Task): Promise<boolean> {
    try {
      const { data, error } = await supabase.from('task').update({
        title: taskToBeUpdated.title,
        description: taskToBeUpdated.description,
        status: taskToBeUpdated.status
      })
        .eq('id', taskId)
        .select();
      console.log("---------- error ", error);
      if (error) throw new Error("updateTask: can't update task");
      console.log("------------data");
      console.log(data);
      return data[0];
    } catch (err) {
      console.log("updateTask repository ", err);
      throw err;
    }
  }

  async deleteTask(taskId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase.from('task').delete()
        .eq('id', taskId)
        .select();
      console.log("---------- error ", error);
      if (error) throw new Error("deleteTask: can't update task");
      return data[0];
    } catch (err) {
      console.log("deleteTask repository ", err);
      throw err;
    }
  }
}