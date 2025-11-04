const db = require('../db');

const Todo = {
  findAll: (username, callback) => {
  const query = `
    SELECT t.* 
    FROM todos t 
    JOIN users u ON t.user_id = u.id 
    WHERE u.username = ?
  `;
  db.query(query, [username], callback);
},

  findById: (id, callback) => {
    db.query('SELECT * FROM todos WHERE id = ?', [id], callback);
  },

  create: (todo, callback) => {
    const { description, done, targetDate, user_id } = todo;
    db.query(
      'INSERT INTO todos (description, done, target_date, user_id) VALUES (?, ?, ?, ?)',
      [description, done, targetDate, user_id],
      callback
    );
  },

  update: (id, todo, callback) => {
    const { description, done, targetDate } = todo;
    db.query(
      'UPDATE todos SET description = ?, done = ?, target_date = ? WHERE id = ?',
      [description, done, targetDate, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM todos WHERE id = ?', [id], callback);
  }
};

module.exports = Todo;
