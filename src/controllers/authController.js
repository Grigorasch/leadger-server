const authService = require("../services/authService");

const authController = {
  async signup(req, res) {
    const { email, password, password_confirmation, name } = req.body;
    authService.signup({ email, password, password_confirmation, name})


  },
};

module.exports = authController;
