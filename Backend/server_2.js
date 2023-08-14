const express = require("express");
const app = express();

//bodyParser : jyare aapde form ma enter kreli value retrive krvi hoy tyare bodyparser package vpray
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

//express.json() is middleware, you enable your Express application to automatically parse incoming JSON data
app.use(express.json());

//password ne encrypt krva mate
const bcrypt = require('bcryptjs');
const saltRounds = 10;

//database connection start
const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'yourpassword',
    database: 'myDB'
})
//database connetion end

app.post('/register', async (req, res) => {
    const { username, firstname, lastname, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    try {
        const result = await client.query("insert into users(username,firstname,lastname,email,password) values($1,$2,$3,$4,$5)", [username, firstname, lastname, email, encryptedPassword]);
        res.redirect('login');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const result = await client.query("SELECT * FROM users WHERE username = $1", [username]);
        if (result.rows.length > 0) {

            const isMatch = await bcrypt.compare(password, result.rows[0].password);
            console.log(isMatch);

            if (isMatch) {
                res.redirect('/');
            }
            else {
                res.redirect('/login');
            }
        }
    }
    catch (error) {
        res.status(500).send('Internal Server Error');
    }

});

