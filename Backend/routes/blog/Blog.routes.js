const { Router } = require("express")
const { addBlogToDatabase } = require("./Blog.service")

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
blogRouter.post('/', async (req, res) => {

  const validatedBlog = await BlogValidationSchema.safeParseAsync(req.body)
  if (!validatedBlog.success) {
    return res.status(400).json(validatedBlog.error.formErrors.fieldErrors)
  }

  const response = addBlogToDatabase(userName, title, description, content, tags);
  res.json(response)

})

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
