const Todo = require('./todo');
const User = require('./mUser');

const TodoService = {
  // Find all todos for a username
  async findAll(username) {
    const user = await User.findOne({ username });
    if (!user) throw new Error('User not found');

    return await Todo.find({ user: user._id });
  },

  // Find todo by ID
  async findById(id) {
    return await Todo.findById(id);
  },

  // Create a new todo
  async create(todoData) {
    return await Todo.create({
      description: todoData.description,
      done: todoData.done,
      targetDate: todoData.targetDate,
      user: todoData.user_id
    });
  },

  // Update an existing todo by ID
  async update(id, updatedData) {
    return await Todo.findByIdAndUpdate(id, {
      description: updatedData.description,
      done: updatedData.done,
      targetDate: updatedData.targetDate
    }, { new: true });
  },

  // Delete todo by ID
  async delete(id) {
    return await Todo.findByIdAndDelete(id);
  }
};

module.exports = TodoService;
