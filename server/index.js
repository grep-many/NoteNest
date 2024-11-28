const cors = require('cors');
const express = require('express');
const connectDB = require('./db');
const { port } = require('./config');
const app = express();

connectDB();

// Enable CORS only for a specific origin
const allowedOrigin = 'https://grep-many.github.io/NoteNest/'; // Replace with your allowed site URL
app.use(
  cors({
    origin: function (origin, callback) {
      if (origin === allowedOrigin || !origin) {
        // Allow requests from the allowed origin or server-side requests (no origin)
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

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
