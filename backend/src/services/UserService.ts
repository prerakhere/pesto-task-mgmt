import UserRepository from "../repositories/UserRepository";

export default class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUserData(emailId: string) {
    try {
      const userData = await this.userRepository.getUserData(emailId);
      return userData;
    } catch (err) {
      throw err;
    }
  }
}