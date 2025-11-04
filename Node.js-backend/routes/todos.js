const express = require('express');
const router = express.Router({ mergeParams: true });
const Todo = require('../models/todoModel');
const User = require('../userModel/user')
// GET all todos for a user
router.get('/', (req, res) => {
  const username = req.params.username;
  Todo.findAll(username, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// GET a specific todo by ID
router.get('/:id', (req, res) => {
  Todo.findById(req.params.id, (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Not Found');
    res.json(results[0]);
  });
});

// CREATE a new todo
router.post('/', (req, res) => {
  const username = req.params.username;
  User.findByUsername(req.params.username, (err, user) => {
  if (err || !user) return res.status(500).send('User not found');


  const newTodo = { ...req.body, user_id: user.id };
  Todo.create(newTodo, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ id: result.insertId, ...newTodo });
  });
});
});

// UPDATE a todo
router.put('/:id', (req, res) => {
  Todo.update(req.params.id, req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Todo updated successfully' });
  });
});

// DELETE a todo
router.delete('/:id', (req, res) => {
  Todo.delete(req.params.id, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Todo deleted successfully' });
  });
});

module.exports = router;
