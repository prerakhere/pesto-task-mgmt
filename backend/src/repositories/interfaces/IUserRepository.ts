import User from "../response-contracts/IUser";

export default interface IUserRepository {
  getUserData(emailId: string): Promise<{ id: string; } | null>;
}