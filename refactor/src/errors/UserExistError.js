class UserExistError extends CustomError {
  constructor(email) {
    super(`User with ${email} email already exists`);
    this.name = this.constructor.name;
    this.email = email;
  }
}

module.exports = UserExistError;