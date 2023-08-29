# APIs

## SignUp API

url: "http://localhost:3000/api/user/signUp"

method: POST

### form fields:
|  Name      |  Description  |
| -----------| --------------|
| firstName  | should be a string with 1 to 30 characters inclusive |
| lastName   | should be a string with 1 to 30 characters inclusive |
| email      | should be a valid email with 1 to 30 characters inclusive |
|password    | should be a string of any size             |
| username   | should be a string with 1 to 30 characters inclusive  |
### responses:
- {"success": "true"}
- {"success": "false", errorMessage: "some error message"}


## SignIn API

url: "http://localhost:3000/api/user/signIn"

method: POST

### form feilds:
| name     | description                         |
| -------- | ----------------------------------- |
| userName | this is optional ONLY if email is provided and should be a string with 1 to 30 characters inclusive|
| email    | this is optional ONLY if username is provided and should be a valid email with 1 to 30 characters inclusive|
| password | should be a string with any number of characters|
### responses:
- {"success": true, "userName": "coresponding username", "firstName": "coresponding first name", "lastName": "coresponding last name", "email": "coresponding email", "token": "coresponding JWT token for that username"}
- {"success": "false", "errorMessage": "some error message"}

> :warning: **JWT tokens are credentials!**, so anyone with its access will be able to access that users account

## Add Blog API

url: "http://localhost:3000/api/blog/addBlog"

method: POST

### headers
| name | value |
| --- | --- |
| Authorization | Bearer token |

> here token is the JWT token provided at the time of login.

**Example:**
```http
POST http://localhost:3000/api/blog/addBlog
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImRpdnlhbnNodTE1OTMiLCJpYXQiOjE2OTMyNDQ4OTh9.lLU1-tdl2QCncrbC5k2wYl_p4JWgOjFJORnZajV3kMk
```

### form feilds
| name | description |
| ---  | ----------- |
| title | should be a string with 1 to 100 characters inclusive |
| description | should be a string with 1 to 500 characters inclusive |
| content | should be a string with 1 to 10000 characters inclusive |
| tags | this is optional and should be a string of comma seperated tags with each tag of 1 to 20 characters inclusive (max 10 tags are allowed and giving and empty string is same as not adding any tag) |

### responses
- {"success": "true"}
- {"success": "false", "errorMessage": "some error message"}