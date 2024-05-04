import UserRepository from "../repositories/UserRepository";

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

  async saveUser(email: string) {
    try {
      await this.userRepository.saveUser(email);
    } catch (err) {
      throw err;
    }
  }


}