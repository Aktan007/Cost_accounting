const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./expenses.db');

db.serialize(() => {
  db.run("DELETE FROM transactions", function (err) {
    if (err) {
      return console.error("Ошибка при удалении транзакций:", err.message);
    }
    console.log(`Удалено записей: ${this.changes}`);

    // Выполняем сброс ID только после удаления
    db.run("DELETE FROM sqlite_sequence WHERE name='transactions'", function (err) {
      if (err) {
        console.error("Ошибка при сбросе ID:", err.message);
      } else {
        console.log("Счётчик ID успешно сброшен до 1.");
      }

      db.close();
    });
  });
});


