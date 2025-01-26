const express = require('express');
const app = express(); // Create the app instance
const cors = require('cors');
const { clientUrl, port } = require('./config/envConfig'); 
const serverRoutes = require('./routes/serverRoutes'); 
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const taskRoutes = require('./routes/taskRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
require('./config/dbConfig'); // Database configuration (ensure this is before routing)

app.use(express.json()); 
app.use(cors({
    origin: clientUrl,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use('/', serverRoutes);
app.use('/user',authRoutes);
app.use('/notes',noteRoutes);
app.use('/task',taskRoutes);
app.use('/feedback',feedbackRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error!',
    });
});

app.listen(port, () => {
    console.log(`Server is online at http://localhost:${port}`);
});