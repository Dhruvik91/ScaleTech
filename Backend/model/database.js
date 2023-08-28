const pg = require('pg');

require('dotenv').config();

// connecting to database
let client = new pg.Client(process.env.DB_URL);

module.exports = client
