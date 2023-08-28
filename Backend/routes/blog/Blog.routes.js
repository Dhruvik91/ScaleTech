const { Router } = require("express")
const { addBlogToDatabase } = require("./Blog.service")
const { addBlogSchema } = require("../../model/validations")
const jwt = require('jsonwebtoken')

const blogRouter = Router()

// LIST 
blogRouter.get('/', async (req, res) => {
  res.send({ success: false, error: "NOT IMPLEMENTED" })
})

// VIEW 
blogRouter.get('/:id', async (req, res) => {
  // search in DB
  res.send({ success: false, error: "NOT IMPLEMENTED" })
})

// CREATE
blogRouter.post('/addBlog', authorize, async (req, res) => {
  let validatedData = addBlogSchema.safeParse(req.body);

  if (validatedData.success){
    console.log(validatedData.data.tags);
    let response = await addBlogToDatabase(req.user.userName, validatedData.data.title, validatedData.data.description,
      validatedData.data.content, validatedData.data.tags);
    res.json(response);
    return ;
  }
  res.json({
    success: false,
    errorMessage: validatedData.error,
  });
})

function authorize(req, res, next){
  let authHeader = req.headers['authorization'];
  let token = authHeader.split(' ')[1];

  jwt.verify(token, process.env.JWT_TOKEN_KEY, (err, user) => {
    if (err){
      res.status(403).json({
        success: false,
        errorMessage: "Invalid token",
      });
      return ;
    }
    req.user = user;
    next();
  });
}

// UPDATE
blogRouter.patch('/:id', async (req, res) => {
  // UPDATE in db
  res.send({ success: false, error: "NOT IMPLEMENTED" })
})

// DELETE
blogRouter.delete('/:id', async (req, res) => {
  // DELETE in db
  res.send({ success: false, error: "NOT IMPLEMENTED" })
})


module.exports = blogRouter
