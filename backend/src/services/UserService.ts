import UserRepository from "../repositories/UserRepository";

export default class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUserId(emailId: string) {
    try {
      const userData = await this.userRepository.getUserId(emailId);
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
    } catch (err: any) {
      console.log(err.message);
      return false;
    }
  }


}