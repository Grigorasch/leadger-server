const authRouter = require('express').Router();
const authController = require('../controllers/authController');

authRouter.post('/signup', authController.signup);
authRouter.post('/l', (req, res) => {
  res.status(200).json(req)
});

module.exports = authRouter;