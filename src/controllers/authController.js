const authService = require("../services/authService");

const authController = {
  async signup(req, res) {
    const { email, password, password_confirmation, name } = req.body;
    await authService.signup({ email, password, password_confirmation, name})

    res.status(200);
  },
};

module.exports = authController;
