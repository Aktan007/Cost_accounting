const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./expenses.db');

db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    amount REAL NOT NULL,
    date TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
    `);
    console.log("Таблица 'transaction' готова")
});

db.close();