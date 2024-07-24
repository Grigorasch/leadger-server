const UserExistError = require("../errors/UserExistError");
const { User, UserSchema } = require("../models/user");
const userRepositorie = require("../repositories/userRepositorie");
const bcrypt = require("bcrypt");

const authService = {
  // Сервис для регистрации пользователя
  async signup(userData) {
    // Валидация данных
    const { error } = UserSchema.validate(userData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    // Проверка наличия пользователя
    const existUser = await userRepositorie.count({
      email: userData.email,
    });
    if (existUser) {
      throw new UserExistError(userData.email);
    }

    // Хеширование пароля
    const password_salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(userData.password, password_salt);
    const user = User.build({
      email: userData.email,
      password_salt,
      password_hash,
      name: userData.name,
    })
    return await userRepositorie.create(user);
  },

  async generateToken() {
    
  }
};

module.exports = authService;
