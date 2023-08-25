const bcrypt = require("bcrypt")
const client = require("../../model/database")

async function checkSignInInfo(userName, email, password) {
  try {
    let result;
    if (userName != null) {
      result = await client.query(`SELECT * FROM person WHERE username=$1;`, [userName])
    } else if (email != null) {
      result = await client.query(`SELECT * FROM person WHERE email=$1;`, [email])
    } else {
      return {
        isSuccess: false,
        errorMessage: "username or email weren't provided",
      }
    }

    if (result.rowCount == 0) {
      return {
        isSuccess: false,
        errorMessage: "username or email didn't match",
      }
    }
    let doesPasswordMatch = await bcrypt.compare(password, result.rows[0].password);

    if (!doesPasswordMatch) {
      return {
        isSuccess: false,
        errorMessage: `password didn't match`
      }
    }

    return {
      isSuccess: true,
      userName: result.rows[0].username,
      firstName: result.rows[0].first_name,
      lastName: result.rows[0].last_name,
      email: result.rows[0].email,
    }

  } catch (err) {
    console.log(err);

    return {
      isSuccess: false,
      errorMessage: `some SQL error occured`
    }
  }

}


async function addSignUpInfo(firstName, lastName, email, password, userName) {

  // checking if username or password already exists
  try {
    const result = await client.query(`SELECT username FROM person WHERE username=$1 OR email=$2`, [userName, email]);

    if (result.rowCount != 0) {
      let signUp = {};

      signUp.isSuccess = false;
      signUp.errorMessage = "username or email already exists";

      return signUp;
    } else {
      let passwordHash = await bcrypt.hash(password, 10);

      await client.query(`INSERT INTO person VALUES ($1, $2, $3, $4, $5)`, [userName, firstName, lastName, email, passwordHash]);

      return { isSuccess: true }
    }
  } catch (err) {
    console.log(err);

    let signUp = {};

    signUp.isSuccess = false;
    signUp.errorMessage = `some SQL error occured`;

    return signUp;
  }


}

module.exports = {
  addSignUpInfo,
  checkSignInInfo
}
