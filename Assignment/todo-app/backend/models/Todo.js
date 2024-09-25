const db = require('../db/database');

class Todo {
  static create(todoId, userId, task, status, callback) {
    db.run(`INSERT INTO todos (id, userId, task, status) VALUES (?, ?, ?, ?)`,
      [todoId, userId, task, status], callback);
  }

  static findByUserId(userId, callback) {
    db.all(`SELECT * FROM todos WHERE userId = ?`, [userId], callback);
  }

  static updateStatus(todoId, status, callback) {
    db.run(`UPDATE todos SET status = ? WHERE id = ?`, [status, todoId], callback);
  }

  static delete(todoId, callback) {
    db.run(`DELETE FROM todos WHERE id = ?`, [todoId], callback);
  }
}

module.exports = Todo;
