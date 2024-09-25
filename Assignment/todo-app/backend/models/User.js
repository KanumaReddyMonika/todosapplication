const db = require('../db/database');

class User {
  static create(userId, name, email, password, callback) {
    db.run(`INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`,
      [userId, name, email, password], callback);
  }

  static findByEmail(email, callback) {
    db.get(`SELECT * FROM users WHERE email = ?`, [email], callback);
  }

  static updateProfile(userId, name, email, password, callback) {
    db.run(`UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`,
      [name, email, password, userId], callback);
  }
}

module.exports = User;
