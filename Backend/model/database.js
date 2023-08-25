const pg = require('pg');

// connecting to database
let client = new pg.Client(process.env.DB_URL);

module.exports = client
