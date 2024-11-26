const cors = require('cors');
const express = require('express');
const connectDB = require('./db');
const { port } = require('./config');
const app = express();

connectDB();
// Enable CORS for all methods and origins
app.use(cors({
  origin: '*',  // Allow requests from any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],  // Allow all methods
  allowedHeaders: ['Content-Type', 'Authorization']  // Add necessary headers
}));
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
