import User from "../response-contracts/IUser";

export default interface IUserRepository {
  getUserId(email: string): Promise<{ id: string; } | null>;
  saveUser(email: string): Promise<void>;
}