const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT, email TEXT, password TEXT)`);
  db.run(`CREATE TABLE IF NOT EXISTS todos (id TEXT PRIMARY KEY, userId TEXT, task TEXT, status TEXT)`);
});

module.exports = db;
