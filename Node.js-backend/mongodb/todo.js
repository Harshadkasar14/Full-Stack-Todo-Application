const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  description: { type: String, required: true },
  done: { type: Boolean, default: false },
  targetDate: { type: Date },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Todo', todoSchema);
