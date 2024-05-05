import User from "../domain/User";
import UserRepository from "../repositories/UserRepository";
import IUser from "../repositories/contracts/IUser";

export default class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUserId(email: string) {
    try {
      return await this.userRepository.getUserId(email);
    } catch (err) {
      throw err;
    }
  }

  async saveUser(userToCreate: IUser) {
    try {
      const newUser = new User({ email: userToCreate.email });
      await this.userRepository.saveUser(newUser);
    } catch (err) {
      throw err;
    }
  }
}