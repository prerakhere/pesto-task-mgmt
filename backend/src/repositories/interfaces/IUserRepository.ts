import User from "../../domain/User";
import IUser from "../contracts/IUser";

export default interface IUserRepository {
  getUserId(email: string): Promise<string | null>;
  saveUser(user: User): Promise<void>;
}