# APIs

## SignUp API

url: "http://localhost:80/signUp"

### responses:
- {"isSuccess": true, "errorMessage": ""}
- {"isSuccess": false, "errorMessage": "method can't be 'GET', it has to be 'POST'"}
- {"isSuccess": false, "errorMessage": "Some of the fields were missing in post request"}
- {"isSuccess": false, "errorMessage": "username or email already exists"}
- {"isSuccess": false, "errorMessage": "some SQL error occured"}


## SignIn API

url: "http://localhost:80/signIn"

### responses:
- {"isSuccess": true, "userName": "divyanshu1593", "firstName": "Divyanshu", "lastName": "MOtivaras", "email": "divyanshu1593"}
- {"isSuccess": false, "errorMessage": "method can't be 'GET', it has to be 'POST'"}
- {"isSuccess": false, "errorMessage": "atleast one of following is nedded: email or username"}
- {"isSuccess": false, "errorMessage": "password is not given"}
- {"isSuccess": false, "errorMessage": "username or email didn't match"}
- {"isSuccess": false, "errorMessage": "password didn't match"}
- {"isSuccess": false, "errorMessage": "some SQL error occured"}