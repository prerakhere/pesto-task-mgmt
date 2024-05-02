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

  async saveUser(emailId: string) {
    try {
      const isUserSaved = await this.userRepository.saveUser(emailId);
      if (!isUserSaved) throw new Error("user not saved");
      return true;
    } catch (err) {
      return false;
    }
  }


}