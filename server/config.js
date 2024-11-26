require('dotenv').config(); // Load .env.local for environment variables

// Fetch the database URI and port from environment variables
const dbURI = process.env.DATABASE_URI;
const port = process.env.PORT;
const jwtSecret =process.env.JWT_SECRET;

// Export both constants
module.exports = {
  dbURI,
  port,
  jwtSecret
};
