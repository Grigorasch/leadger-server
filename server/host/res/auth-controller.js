const validator = require('validator');
const generatePayload = require('../../boot/generate-payload');

// const authService = require("./auth-service");

const authController = {
  async signup(req, res) {
    const { email, password, password_confirmation, name } = req.body;

    try {
      await authService.signup({ email: validator.escape(email), email: validator.escape(password), email: validator.escape(password_confirmation), email: validator.escape(name) });
      const payload = generatePayload(req);
      // const token = authService.generateToken(payload);
      res.hearder('Authorization', `Bearer ${token}`);
      res.send('ok');
    } catch (error) {
      switch (error.name) {
        case 'UserExistError':
          res.status(400).send({ message: 'User already exists' });
          break;

        case 'ValidationError':
          const errors = error.details.map(detail => ({
            message: detail.message,
            field: detail.context.key,
            type: detail.type,
          }));
          res.status(400).send({ message: 'Validation error', errors });
          break;

        default:
          throw error;
      }
    }
  },
};

module.exports = authController;