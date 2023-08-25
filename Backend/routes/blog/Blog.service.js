const client = require("../../model/database")

async function addBlogToDatabase(userName, title, description, content, tags) {
  try {
    // checking if the username is valid
    let result = await client.query(`SELECT username FROM person WHERE username=$1`, [userName]);

    if (result.rowCount == 0) {
      // so the username does not eixst
      let addBlog = {};

      addBlog.isSuccess = false;
      addBlog.errorMessage = `username does not exist`;

      return addBlog;
    }
    else if (title.length > 100) {
      let addBlog = {};

      addBlog.isSuccess = false;
      addBlog.errorMessage = `title length can't be more than 100 characters`

      return addBlog;
    }
    else if (description.length > 500) {
      let addBlog = {};

      addBlog.isSuccess = false;
      addBlog.errorMessage = `description length can't be more than 500 characters`

      return addBlog;
    }
    else if (content.length > 10000) {
      let addBlog = {};

      addBlog.isSuccess = false;
      addBlog.errorMessage = `content length can't be more than 10000 characters`

      return addBlog;
    }
    else if (tags === undefined) {
      await client.query(`INSERT INTO blogs (username, title, description, content) values ($1, $2, $3, $4)`, [userName, title, description, content]);

      let addBlog = {};

      addBlog.isSuccess = true;
      addBlog.errorMessage = "";

      return addBlog;
    }
    else {
      let isAddTags = true;

      if (tags.length === 0) isAddTags = false;

      if (tags.length > 10) {
        let addBlog = {};

        addBlog.isSuccess = false;
        addBlog.errorMessage = `there can be maximum 10 tags in a blog`;

        return addBlog;
      } else {
        invalidLength = false;
        for (let tag of tags) {
          if (tag.length > 20) {
            invalidLength = true;
            break;
          }
        }
        if (invalidLength) {
          let addBlog = {};

          addBlog.isSuccess = false;
          addBlog.errorMessage = `length of a tag cant't be more then 20`;

          return addBlog;
        } else {
          await client.query(`INSERT INTO blogs (username, title, description, content) values ($1, $2, $3, $4)`, [userName, title, description, content]);

          if (isAddTags) {
            // getting the blog id
            let result2 = await client.query(`SELECT id FROM blogs ORDER BY datetime DESC LIMIT 1`);
            let blog_id = result2.rows[0].id;

            for (let tag of tags) {
              // checking if the tag already exists
              let result = await client.query(`SELECT tag FROM tags WHERE tag = $1`, [tag]);

              if (result.rowCount == 0) {
                // tag does not exist
                // so adding the tag in the database
                let result = await client.query(`INSERT INTO tags (tag) VALUES ($1)`, [tag]);
              }

              // adding blog id to tag
              let result2 = await client.query(`UPDATE tags
                                                            SET blogs = blogs || $1 :: hstore
                                                            WHERE tag = $2`, [`"${blog_id}" => "1"`, tag]);
            }
          }

          let addBlog = {};

          addBlog.isSuccess = true;
          addBlog.errorMessage = "";

          return addBlog;
        }
      }

    }

  } catch (err) {
    console.log(err);

    let addBlog = {};

    addBlog.isSuccess = false;
    addBlog.errorMessage = `some SQL error occured`;

    return addBlog;
  }
}


module.exports = {
  addBlogToDatabase
}
