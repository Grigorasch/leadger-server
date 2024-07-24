const User = require("../models/user");
const userRepositorie = require("../repositories/userRepositorie");

const authService = {
  async signup(newUser) {
    const newUserModel = User.build(newUser);
    try {
      await newUserModel.validate();
      const existUser = await userRepositorie.count({email: newUserModel.email});
      if (existUser) {
        throw new Error("User with this email already exists");
      }
      return await userRepositorie.create(newUserModel);
    } catch(error) {
      throw error;
    }
  },
};

module.exports = authService;
