const authRouter = require('express').Router();

const User = require('../models/user');
const authController = require('../controllers/authController');

authRouter.get('/g' , async (req, res) => {
const user = await User.build({
  email: 'xcvkp@example.com',
  password: '123456',
  password_confirmation: '123456',
  name: 'Григорий',
});
  try {
    await user.validate()
  } catch (error) {
     console.log(error);
  }
  console.log(user)
  
  res.send('g');
});

authRouter.post('/signup', authController.signup);

module.exports = authRouter;