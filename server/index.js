const cors = require('cors');
const express = require('express');
const connectDB = require('./db');
const { port } = require('./config');
const app = express();

connectDB();
app.use(cors());  // Use the corsOptions in the middleware
app.use(express.json());

// Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`NoteNest listening on port ${port}`);
});
