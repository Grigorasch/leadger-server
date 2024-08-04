const authRouter = require('express').Router();
const authController = require('../res/auth-controller');

authRouter.post('/signup', authController.signup);

module.exports = authRouter;