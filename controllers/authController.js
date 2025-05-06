const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, passwordHash });
  req.session.userId = user._id;
  res.redirect('/dashboard');
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.send('Invalid credentials');
  }
  req.session.userId = user._id;
  res.redirect('/dashboard');
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/auth/login');
};

exports.showLogin = (req, res) => {
  res.render('login');
};

exports.showRegister = (req, res) => {
  res.render('register');
};