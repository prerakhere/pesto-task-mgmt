import supabase from "../../config/db-config";
import Task from "./response-contracts/ITask";
import ITaskRepository from "./interfaces/ITaskRepository";
import BaseError from "../ErrorHandler";


export default class TaskRepository implements ITaskRepository {


  async getAllTasks(userId: string) {
    try {
      const { error, data } = await supabase.from('task').select().eq('user_id', userId);
      console.log(data);
      if (error) throw new BaseError(500, "getAllTasks repository: can't fetch tasks");
      return data;
    } catch (err: any) {
      throw err;
    }
  }

  async getTaskById(taskId: string) {
    try {
      const { error, data } = await supabase.from('task').select().eq('id', taskId);
      console.log(data);
      if (error) throw new BaseError(500, "getTaskById repository: can't fetch task");
      return data[0];
    } catch (err: any) {
      throw err;
    }
  }

  async createTask(userId: string, newTask: Task) {
    try {
      const { data, error } = await supabase.from('task').insert({
        user_id: userId,
        title: newTask.title,
        description: newTask.description,
        status: newTask.status
      }).select();
      if (error) throw new BaseError(500, "createTask repository: can't create task");
      return data[0];
    } catch (err) {
      throw err;
    }
  }

  async updateTask(taskId: string, taskToBeUpdated: Task) {
    try {
      const selectRes = await supabase.from('task').select('id').eq('id', taskId);
      if (selectRes.data?.length === 0) {
        throw new BaseError(500, "updateTask repository: task with this id does not exist");
      }
      const { error, data } = await supabase.from('task').update({
        title: taskToBeUpdated.title,
        description: taskToBeUpdated.description,
        status: taskToBeUpdated.status
      }).eq('id', taskId).select();
      if (error) throw new BaseError(500, "updateTask repository: can't update task");
      return data[0];
    } catch (err: any) {
      throw err;
    }
  }

  async deleteTask(taskId: string) {
    try {
      const { error } = await supabase.from('task').delete()
        .eq('id', taskId);
      if (error) throw new BaseError(500, "deleteTask repository: can't delete task");
    } catch (err) {
      throw err;
    }
  }
}