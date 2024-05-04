import UserRepository from "../repositories/UserRepository";

export default class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUserId(emailId: string) {
    try {
      return await this.userRepository.getUserId(emailId);
    } catch (err) {
      throw err;
    }
  }

  async saveUser(emailId: string) {
    try {
      await this.userRepository.saveUser(emailId);
    } catch (err) {
      throw err;
    }
  }


}