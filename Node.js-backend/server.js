const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const todoRoutes = require('./routes/todos');
const mtodoRoutes = require('./mongodb/mTodoRoutes');
const userRoutes=require('./userModel/userRoutes')
const mUserRoutes=require('./mongodb/mUserRoutes')

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',  // Your React app's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(bodyParser.json());

require('./mongodb/mdb'); 

app.use('/api/users/:username/todos', todoRoutes);
app.use('/api/users', userRoutes);

// app.use('/api/users/:username/todos', mtodoRoutes);
// app.use('/api/users', mUserRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
