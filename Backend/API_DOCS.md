# APIs

## SignUp API

url: "http://localhost:80/signUp"

### form fields:
|  Name      |  Description  |
| -----------| --------------|
| firstName  | should be a string of at max 30 characters |
| lastName   | should be a string of at max 30 characters |
| email      | should be a string of at max 30 characters |
|password    | should be a string of any size             |
| username   | shoild be a string of at max 30 charactes  |
### responses:
- {"isSuccess": true, "errorMessage": ""}
- {"isSuccess": false, "errorMessage": "method can't be 'GET', it has to be 'POST'"}
- {"isSuccess": false, "errorMessage": "Some of the fields were missing in post request"}
- {"isSuccess": false, "errorMessage": "username or email already exists"}
- {"isSuccess": false, "errorMessage": "some SQL error occured"}


## SignIn API

url: "http://localhost:80/signIn"

### form feilds:
| name     | description                         |
| -------- | ----------------------------------- |
| userName | this is optional ONLY if email is provided and should be a string with at max 30 characters|
| email    | this is optional ONLY if username is provided and should be a string with at max 30 characters|
| password | should be a string with any number of characters|
### responses:
- {"isSuccess": true, "userName": "divyanshu1593", "firstName": "Divyanshu", "lastName": "Motivaras", "email": "divyanshu1593"}
- {"isSuccess": false, "errorMessage": "method can't be 'GET', it has to be 'POST'"}
- {"isSuccess": false, "errorMessage": "atleast one of following is nedded: email or username"}
- {"isSuccess": false, "errorMessage": "password is not given"}
- {"isSuccess": false, "errorMessage": "username or email didn't match"}
- {"isSuccess": false, "errorMessage": "password didn't match"}
- {"isSuccess": false, "errorMessage": "some SQL error occured"}


## Add Blog API

url: "http://localhost:80/addBlog"

### form feilds
| name | description |
| ---  | ----------- |
| userName | should be string with max of 30 characters |
| title | should be string with max of 100 characters |
| description | should be a string with max of 500 characters |
| content | should be a string with max of 10000 characters |
| tags | this is optional and should be a string of comma seperated tags with each tag of max 20 characters (max 10 tags are allowed and giving and empty string is same as not adding any tag) |

### responses
- {"isSuccess": "true", "errorMessage": ""}
- {"isSUccess": "false", "errorMessage": "method can't be 'GET', it has to be 'POST'"}
- {"isSUccess": "false", "errorMessage": "some of the fields are missing"}
- {"isSUccess": "false", "errorMessage": "username does not exist"}
- {"isSUccess": "false", "errorMessage": "title length can't be more than 100 characters"}
- {"isSUccess": "false", "errorMessage": "description length can't be more than 500 characters"}
- {"isSUccess": "false", "errorMessage": "content length can't be more than 10000 characters"}
- {"isSUccess": "false", "errorMessage": "there can be maximum 10 tags in a blog"}
- {"isSUccess": "false", "errorMessage": "length of a tag cant't be more then 20"}
- {"isSUccess": "false", "errorMessage": "some SQL error occured"}
