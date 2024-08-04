
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
    });
    return await userRepositorie.create(user);
  },

  generateToken(payload) {
    const secretKey = process.env.JWT_SECRET;
    return jwt.sign(payload, secretKey, {
      algorithm: process.env.JWT_ALG,
    });
  },

  async verifyToken(token, sub) {
    try {
      const secretKey = process.env.JWT_SECRET;
      const decoded = jwt.verify(token, secretKey, {
        algorithms: [process.env.JWT_ALG],
        subject: sub,
      });
      return decoded;
    } catch (err) {
      throw new Error("Invalid token");
    }
  },
};

module.exports = authService;