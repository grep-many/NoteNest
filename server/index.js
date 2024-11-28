const cors = require('cors');
const express = require('express');
const connectDB = require('./db');
const { port } = require('./config');
const app = express();

connectDB();
// Enable CORS for all methods and origins
app.use(cors());
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
