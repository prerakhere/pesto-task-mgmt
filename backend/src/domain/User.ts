interface UserAttributes {
  email: string;
}

export default class User {
  private email: string;

  constructor({ email }: UserAttributes) {
    this.email = email;
  }

  getEmail() {
    return this.email;
  }

}