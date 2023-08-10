"use strict";

const pg = require('pg');
const http = require('http');
const bcrypt = require('bcrypt');
const { sign } = require('crypto');

// connecting to ElephantSQL
let conString = "postgres://otalcrol:JcHKJRmTiPo0eKntu6R5zi3zq0L6PuBu@drona.db.elephantsql.com/otalcrol" //Can be found in the Details page
let client = new pg.Client(conString);


client.connect((err) => {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
});



// creating server
const server = http.createServer((request, response) => {
    // setting headers for CORS
    let headers = request.rawHeaders;
        
    response.writeHead(200, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Method': headers[headers.indexOf('Access-Control-Request-Method') + 1],
        'Access-Control-Allow-Headers': headers[headers.indexOf('Access-Control-Request-Headers') + 1],
    });
    if (request.method == 'OPTIONS'){
        response.end();
    }

    // APIs

    // making api for storing data to database
    else if (request.url == '/signUp') {

        // API key to be returned in response
        let signUp = {};

        if (request.method != 'POST') {

            signUp.isSuccess = false;
            signUp.errorMessage = "The Method has to be POST";

            response.write( JSON.stringify(signUp) );
            response.end();
        } else {
            let body = '';

            // for handling error
            request.on('error', (err) => {
                if(err) {
                    response.writeHead(500, {'Content-Type': 'text/html'});
                    response.write('An error occurred');
                    response.end();
                }
            });

            // reading chunks of POST data
            request.on('data', chunk => {
                body += chunk.toString();
            });

            request.on('end', () => {
                // use parse() method
                body = JSON.parse(body);
    
                if (('firstName' in body) && ('lastName' in body) && ('email' in body) && ('password' in body) && ('userName' in body)){

                    addSignUpInfo(body.firstName, body.lastName, body.email, body.password, body.userName, signUp, response);
                } else {
                    // if some of the fields are missing in api request
                    signUp.isSuccess = false;
                    signUp.errorMessage = "Some of the fields were missing in post request";

                    response.write( JSON.stringify(signUp) );
                    response.end();
                }
            });
        }

    }
    
    // API for signin
    else if (request.url == '/signIn'){
        // API key to be returned in response
        let signIn = {};

        if (request.method != 'POST'){
            signIn.isSuccess = false;
            signIn.errorMessage = "Method must be POST";

            response.write( JSON.stringify(signIn) );
            response.end()
        } else {
            let body = '';

            // for handling error
            request.on('error', (err) => {
                if(err) {
                    response.writeHead(500, {'Content-Type': 'text/html'});
                    response.write('An error occurred');
                    response.end();
                }
            });

            // reading chunks of POST data
            request.on('data', chunk => {
                body += chunk.toString();
            });

            request.on('end', () => {
                // use parse() method
                body = JSON.parse(body);

                if (!('userName' in body || 'email' in body)){
                    signIn.isSuccess = false;
                    signIn.errorMessage = "atleast one of following is nedded: email or username";

                    response.write( JSON.stringify(signIn) );
                    response.end()
                }
                else if (!('password' in body)){
                    signIn.isSuccess = false;
                    signIn.errorMessage = "password is not given";

                    response.write( JSON.stringify(signIn) );
                    response.end()
                }
                else {
                    checkSignInInfo(body.userName, body.email, body.password, signIn, response);
                }
            });
        }
    }
    else {
        response.end();
    }
});

server.listen(80);


async function checkSignInInfo(userName, email, password, signIn, response){
    
    client.query(userName === undefined ? `SELECT * FROM person WHERE email='${email}'` : `SELECT * FROM person WHERE username='${userName}'`, async (err, result) => {
        if (err){
            console.log(err);
            signIn.isSuccess = false;
            signIn.errorMessage = "Some SQL error occured";

            response.write( JSON.stringify(signIn) );
            response.end();
        }
        else {
            if (result.rowCount == 0){
                signIn.isSuccess = false;
                signIn.errorMessage = "username or email didn't match";

                response.write( JSON.stringify(signIn) );
                response.end();
            }
            else{

                let doesPasswordMatch = await bcrypt.compare(password, result.rows[0].password);

                if (doesPasswordMatch){
                    signIn.isSuccess = true;
                    signIn.userName = result.rows[0].username;
                    signIn.firstName = result.rows[0].first_name;
                    signIn.lastName = result.rows[0].last_name;
                    signIn.email = result.rows[0].email;

                    response.write( JSON.stringify(signIn) );
                    response.end();
                }
                else{
                    signIn.isSuccess = false;
                    signIn.errorMessage = "password didn't match";

                    response.write( JSON.stringify(signIn) );
                    response.end();
                }
            }
        }
    });
}

async function addSignUpInfo(firstName, lastName, email, password, userName, signUp, response) {

    client.query(`SELECT email,password FROM person WHERE email='${email}' or username='${userName}';`, async (err, result) => {
        if (err){
            console.log(err);
            signUp.isSuccess = false;
            signUp.errorMessage = "Some SQL error occured";

            response.write( JSON.stringify(signUp) );
            response.end();
        } else {
            if (result.rowCount != 0){

                signUp.isSuccess = false;
                signUp.errorMessage = "username or email already exists";

                response.write( JSON.stringify(signUp) );
                response.end();
            } else {
                let passwordHash = await bcrypt.hash(password, 10);

                client.query(`INSERT INTO person VALUES ('${userName}', '${firstName}', '${lastName}', '${email}', '${passwordHash}');`, (err, result) => {
                    if (err){
                        console.log(err);
                        signUp.isSuccess = false;
                        signUp.errorMessage = "Some SQL error occured";

                        response.write( JSON.stringify(signUp) );
                        response.end();
                    } else {
                        signUp.isSuccess = true;
                        signUp.errorMessage = "";

                        response.write( JSON.stringify(signUp) );
                        response.end();
                    }
                });
            }
        }
    });

}