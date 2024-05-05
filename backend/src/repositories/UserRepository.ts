import supabase from "../../config/db-config";
import IUserRepository from "./interfaces/IUserRepository";
import BaseError from "../utils/ErrorHandler";
import User from "../domain/User";


export default class UserRepository implements IUserRepository {
  async getUserId(email: string) {
    try {
      const { error, data } = await supabase.from('user').select('id').eq('email', email);
      if (error) throw new BaseError(500, "getUserId repository: can't fetch user id");
      if (data.length && data[0].id) return data[0].id;
      return null;
    } catch (err) {
      throw err;
    }
  }

  async saveUser(user: User) {
    try {
      const { status, error } = await supabase.from('user').insert({
        email: user.getEmail()
      });
      if (error || status !== 201) {
        throw new BaseError(500, "saveUser repository: can't save user");
      }
    } catch (err: any) {
      throw err;
    }
  }
}