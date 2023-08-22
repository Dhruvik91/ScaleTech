const express = require("express");
const pg = require('pg');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');


// setting environment variables
require('dotenv').config();

// connecting to database
let client = new pg.Client(process.env.DB_URL);

client.connect((err) => {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
});


const app = express();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


// making API for storing signup data to the database

app.get('/signUp', (req, res) => {
    let signUp = {};

    signUp.isSuccess = false;
    signUp.errorMessage = `method can't be 'GET', it has to be 'POST'`;

    res.send(JSON.stringify(signUp));
});


app.post('/signUp', (req, res) => {
    if (('firstName' in req.body) && 
    ('lastName' in req.body) && 
    ('email' in req.body) && 
    ('password' in req.body) && 
    ('userName' in req.body)){

        addSignUpInfo(req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.body.userName, res);
    } else {
        // if some of the fields are missing in api request
        let signUp = {};

        signUp.isSuccess = false;
        signUp.errorMessage = "Some of the fields were missing in post request";

        res.send(JSON.stringify(signUp));
    }
});


// making API for signin

app.get('/signIn', (req, res) => {
    let signIn = {};

    signIn.isSuccess = false;
    signIn.errorMessage = `method can't be 'GET', it has to be 'POST'`;

    res.send(JSON.stringify(signIn));
});


app.post('/signIn', (req, res) => {
    if (!('userName' in req.body || 'email' in req.body)){
        let signIn = {};

        signIn.isSuccess = false;
        signIn.errorMessage = "atleast one of following is nedded: email or username";

        res.send(JSON.stringify(signIn));
    }
    else if (!('password' in req.body)){
        let signIn = {};

        signIn.isSuccess = false;
        signIn.errorMessage = "password is not given";

        res.send(JSON.stringify(signIn))
    } else {
        checkSignInInfo(req.body.userName, req.body.email, req.body.password, res);
    }
});



async function checkSignInInfo(userName, email, password, res){
    try{
        let result = await client.query(userName === undefined ? `SELECT * FROM person WHERE email=$1;` : `SELECT * FROM person WHERE username=$1;`, [userName === undefined ? email : userName]);

        if (result.rowCount == 0){
            let signIn = {};

            signIn.isSuccess = false;
            signIn.errorMessage = "username or email didn't match";

            res.send(JSON.stringify(signIn));
        } else {
            let doesPasswordMatch = await bcrypt.compare(password, result.rows[0].password);

            if (!doesPasswordMatch){
                let signIn = {};

                signIn.isSuccess = false;
                signIn.errorMessage = `password didn't match`;

                res.send(JSON.stringify(signIn));
            } else {
                let signIn = {};

                signIn.isSuccess = true;
                signIn.userName = result.rows[0].username;
                signIn.firstName = result.rows[0].first_name;
                signIn.lastName = result.rows[0].last_name;
                signIn.email = result.rows[0].email;

                res.send(JSON.stringify(signIn));
            }
        }

    } catch(err) {
        console.log(err);

        let signIn = {};

        signIn.isSuccess = false;
        signIn.errorMessage = `some SQL error occured`;

        res.send(JSON.stringify(signIn));
    }

}


async function addSignUpInfo(firstName, lastName, email, password, userName, res){

    // checking if username or password already exists
    try{
        const result = await client.query(`SELECT username FROM person WHERE username=$1 OR email=$2`, [userName, email]);

        if (result.rowCount != 0){
            let signUp = {};

            signUp.isSuccess = false;
            signUp.errorMessage = "username or email already exists";

            res.send(JSON.stringify(signUp));
        } else {
            let passwordHash = await bcrypt.hash(password, 10);

            const result = await client.query(`INSERT INTO person VALUES ($1, $2, $3, $4, $5)`, [userName, firstName, lastName, email, passwordHash]);
            
            let signUp = {};

            signUp.isSuccess = true;
            signUp.errorMessage = "";
            
            res.send(JSON.stringify(signUp));
        }
    } catch (err) {
        console.log(err);

        let signUp = {};

        signUp.isSuccess = false;
        signUp.errorMessage = `some SQL error occured`;

        res.send(JSON.stringify(signUp));
    }
    

}


app.listen(80);