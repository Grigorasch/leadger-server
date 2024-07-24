const { User, UserSchema } = require("../models/user");
const userRepositorie = require("../repositories/userRepositorie");

const authService = {
  async signup(userData) {
    try {
      const { value, error } = UserSchema.validate(userData);
      if (error) {
        console.log(error);
        throw new Error(error.details[0].message);
      }
      console.log(value);
      const existUser = await userRepositorie.count({
        email: value.email,
      });
      if (existUser) {
        throw new Error("User with this email already exists");
      }
      return await userRepositorie.create(value);
    } catch (error) {
      throw error;
    }
  },
};

module.exports = authService;
