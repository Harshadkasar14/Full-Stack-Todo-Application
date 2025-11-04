const mongoose = require('mongoose');

console.log("Starting MongoDB connection...");

mongoose.connect('mongodb://localhost:27017/todos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
