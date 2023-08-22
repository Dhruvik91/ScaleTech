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

let signUp = {};

app.get('/signUp', (req, res) => {

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

        addSignUpInfo(req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.body.userName, signUp, res);
    } else {
        // if some of the fields are missing in api request
        signUp.isSuccess = false;
        signUp.errorMessage = "Some of the fields were missing in post request";

        res.send(JSON.stringify(signUp));
    }
});



async function addSignUpInfo(firstName, lastName, email, password, userName, signUp, res){

    // checking if username or password already exists
    try{
        const result = await client.query(`SELECT username FROM person WHERE username=$1 OR email=$2`, [userName, email]);

        if (result.rowCount != 0){

            signUp.isSuccess = false;
            signUp.errorMessage = "username or email already exists";

            response.send(JSON.stringify(signUp));
        } else {
            let passwordHash = await bcrypt.hash(password, 10);

            const result = await client.query(`INSERT INTO person VALUES ($1, $2, $3, $4, $5)`, [userName, firstName, lastName, email, passwordHash]);
            
            signUp.isSuccess = true;
            signUp.errorMessage = "";
            
            res.send(JSON.stringify(signUp));
        }
    } catch (err) {
        console.log(err);

        signUp.isSuccess = false;
        signUp.errorMessage = `some SQL error occured`;

        res.send(JSON.stringify(signUp));
    }
    

}


app.listen(80);