const cors = require('cors');
const express = require('express');
const connectDB = require('./db');
const { port } = require('./config');

const app = express();

connectDB();

// Allow only one origin
const allowedOrigin = 'https://grep-many.github.io/NoteNest/';
app.use(
  cors({
    origin: function (origin, callback) {
      if (origin === allowedOrigin || !origin) {
        // Allow requests from the allowed origin or server-side requests (no origin for internal use)
        callback(null, true);
      } else {
        // Reject other origins
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Allow all HTTP methods
    credentials: true, // Allow cookies or authentication headers if needed
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
