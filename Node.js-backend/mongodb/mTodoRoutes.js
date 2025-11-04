const express = require('express');
const router = express.Router({ mergeParams: true });
const Todo = require('./todo'); // Mongoose Todo model
const User = require('./mUser'); // Mongoose User model

// GET all todos for a user
router.get('/', async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send('User not found');

    const todos = await Todo.find({ user: user._id });
    res.json(todos);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET a specific todo by ID
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).send('Not Found');
    res.json(todo);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// CREATE a new todo
router.post('/', async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).send('User not found');

    const newTodo = new Todo({
      description: req.body.description,
      done: req.body.done,
      targetDate: req.body.targetDate,
      user: user._id
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// UPDATE a todo
router.put('/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        description: req.body.description,
        done: req.body.done,
        targetDate: req.body.targetDate
      },
      { new: true }
    );
    if (!updatedTodo) return res.status(404).send('Todo not found');
    res.json({ message: 'Todo updated successfully', todo: updatedTodo });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// DELETE a todo
router.delete('/:id', async (req, res) => {
  try {
    const result = await Todo.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send('Todo not found');
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
