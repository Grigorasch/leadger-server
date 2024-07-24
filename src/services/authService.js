const User = require("../models/user");
const userRepositorie = require("../repositories/userRepositorie");

const authService = {
  async signup(newUser) {
    const newUserModel = User.build({
      email,
      password,
      password_confirmation,
      name,
    });

    try {
      await newUserModel.validate();
      const existUser = await userRepositorie.findOne({email: newUserModel.email});
      console.log(existUser);
    } catch(error) {
      
    }
  },
};

module.exports = authService;
