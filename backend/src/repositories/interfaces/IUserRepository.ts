import User from "../response-contracts/IUser";

export default interface IUserRepository {
  getUserId(emailId: string): Promise<{ id: string; } | null>;
  saveUser(emailId: string): Promise<void>;
}