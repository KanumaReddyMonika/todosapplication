const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token required');

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) return res.status(403).send('Invalid token');
    req.userId = user.userId;
    next();
  });
};

module.exports = { authenticateToken };
