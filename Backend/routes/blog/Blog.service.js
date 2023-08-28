const client = require("../../model/database")

async function addBlogToDatabase(userName, title, description, content, tags) {
  try {
    // checking if the username is valid
    let result = await client.query(`SELECT username FROM person WHERE username=$1`, [userName]);

    if (result.rowCount == 0) {
      // so the username does not eixst
      return {
        success: false,
        errorMessage: "username does not exist",
      }
    }
    if (tags === undefined) {
      await client.query(`INSERT INTO blogs (username, title, description, content) values ($1, $2, $3, $4)`, [userName, title, description, content]);

      return {
        success: true,
      }
    }
    await client.query(`BEGIN`);
    await client.query(`INSERT INTO blogs (username, title, description, content) values ($1, $2, $3, $4)`, [userName, title, description, content]);

    // getting the blog id
    let result2 = await client.query(`SELECT id FROM blogs ORDER BY datetime DESC LIMIT 1`);
    let blog_id = result2.rows[0].id;

    for (let tag of tags){
      await client.query(`INSERT INTO tags (tag, blog_id) VALUES ($1, $2)`, [tag, blog_id]);
    }
    await client.query(`COMMIT`);

    return {
      success: true,
    }

  } catch (err) {
    console.log(err);

    return {
      success: false,
      errorMessage: "some SQL error occured",
    }
  }
}


module.exports = {
  addBlogToDatabase
}
