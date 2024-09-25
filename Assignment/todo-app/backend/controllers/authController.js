const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');

const signup = (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const userId = uuidv4();

  User.create(userId, name, email, hashedPassword, (err) => {
    if (err) return res.status(500).send('Error creating user');
    res.status(201).send({ message: 'User created' });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (err, user) => {
    if (err || !user) return res.status(400).send('User not found');
    
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) return res.status(400).send('Invalid password');

    const token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '1h' });
    res.send({ token });
  });
};

module.exports = { signup, login };
