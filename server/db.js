const mongoose = require('mongoose'); // Import mongoose
const { dbURI } = require('./config');

const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB
    await mongoose.connect(dbURI);
    console.log("Connected to MongoDB successfully!"); // Success message
  } catch (error) {
    // Log any connection errors
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process with failure code
  }
};

module.exports = connectDB; // Export the connectDB function for use in other parts of the app
