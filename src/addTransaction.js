const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./expenses.db');

const transaction = {
    type: 'expense',
    amount: 250.50,
    date: '2025-04-22',
    category: 'Продукты',
    description: 'Закупка в пятёрочке',
    created_at: new Date().toISOString()
  };
  
  db.get(
    'SELECT * FROM transactions WHERE amount = ? AND date = ? AND category = ? AND description = ? AND created_at = ?',
    [transaction.amount, transaction.date, transaction.category, transaction.description, transaction.created_at],
    (err, row) => {
      if (row) {
        console.log('Такая транзакция уже существует');
      } else {
        db.run(
          `INSERT INTO transactions (type, amount, date, category, description, created_at)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [transaction.type, transaction.amount, transaction.date, transaction.category, transaction.description, transaction.created_at],
          function(err) {
            if (err) return console.error(err.message);
            console.log(`Добавлена транзакция с ID ${this.lastID}`);
          }
        );
      }
    }
  );
  
  
  
  db.close();