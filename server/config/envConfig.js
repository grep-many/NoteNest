require('dotenv').config();

const dbUri =  process.env.DATABASE_URI;
const port= process.env.PORT;
const pepper= process.env.PEPPER;
const jwtSecret =  process.env.JWT_SECRET;
const clientUrl = process.env.CLIENT_URL;

module.exports = {
    dbUri,
    port,
    pepper,
    jwtSecret,
    clientUrl,
}