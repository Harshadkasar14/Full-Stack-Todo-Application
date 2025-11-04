const db = require('../db');

const User = {
    create: (username, password, callback) => {
        const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
        db.query(sql, [username, password], (err, results) => {
            if (err) return callback(err);
            callback(null, results);
        });
    },

    findByUsername: (username, callback) => {
        const sql = 'SELECT * FROM users WHERE username = ?';
        db.query(sql, [username], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    },

    existsByUsername: (username, callback) => {
        const sql = 'SELECT COUNT(*) AS count FROM users WHERE username = ?';
        db.query(sql, [username], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0].count > 0);
        });
    },

    updatePassword: (username, newPassword, callback) => {
    const sql = 'UPDATE users SET password = ? WHERE username = ?';
    db.query(sql, [newPassword, username], callback);
}
};





module.exports = User;
