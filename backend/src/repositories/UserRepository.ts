import supabase from "../../config/db-config";
import IUser from "./response-contracts/IUser";
import IUserRepository from "./interfaces/IUserRepository";


export default class UserRepository implements IUserRepository {
  async getUserData(emailId: string) {
    try {
      const { error, data } = await supabase.from('user').select('id').eq('email', emailId);
      console.log("------------- user data / id -------------");
      console.log(data);
      if (error) throw new Error("getUserData: can't fetch user data");
      if (data.length && data[0].id) return { id: data[0].id };
      return null;
    } catch (err: any) {
      console.log("getUserData repository ", err);
      throw err;
    }
  }

  async saveUser(emailId: string) {
    try {
      const { status, error } = await supabase.from('user').insert({
        email: emailId
      });
      if (status === 201) return true;
      if (error || status !== 201) {
        throw new Error("saveUser repository");
      }
      return false;
    } catch (err: any) {
      console.log(err.message);
      return false;
    }
  }
}