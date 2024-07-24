const authRouter = require('express').Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/user');

authRouter.get('/g' , async (req, res) => {
const user = await User.build({
  email: 'xcvkp@example.com',
  password: '123456',
  role: 'admin'
});
  console.log(user)
  res.send('g');
});

authRouter.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).send('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.send('User registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

module.exports = authRouter;