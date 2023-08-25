const { Router } = require("express")
const { addSignUpInfo, checkSignInInfo } = require("./User.service")
const {
  LoginUserSchema,
  UserValidationSchema,
} = require("../../model/validations");

const userRouter = Router()

// LOGIN
userRouter.post('/signin', async (req, res) => {

  const validatedData = await LoginUserSchema.safeParseAsync(req.body)

  if (!validatedData.success) {
    return res.status(400).json(validatedData.error.formErrors.fieldErrors)
  }

  const response = await checkSignInInfo(validatedData.data.username, null /*STUB*/, validatedData.data.password);
  res.send(response)
});


// LOGOUT
userRouter.post('/signout', async (req, res) => {
  res.send({ success: false, error: "NOT IMPLEMENTED : SIGNOUT" })
});

// LIST 
userRouter.get('/', async (req, res) => {
  res.send({ success: false, error: "NOT IMPLEMENTED" })
})

// VIEW 
userRouter.get('/:id', async (req, res) => {
  // search in DB
  res.send({ success: false, error: "NOT IMPLEMENTED" })
})

// CREATE
userRouter.post('/', async (req, res) => {

  let validatedData = await UserValidationSchema.safeParseAsync(req.body)

  if (!validatedData.success) {
    return res.status(400).json(validatedData.error.formErrors.fieldErrors)
  }

  const insertResponse = await addSignUpInfo(
    validatedData.data.first_name,
    validatedData.data.last_name,
    validatedData.data.email,
    validatedData.data.password,
    validatedData.data.username,
  )

  return res.json(insertResponse)
})

// UPDATE
userRouter.patch('/:id', async (req, res) => {
  // UPDATE in db
  res.send({ success: false, error: "NOT IMPLEMENTED" })
})

// DELETE
userRouter.delete('/:id', async (req, res) => {
  // DELETE in db
  res.send({ success: false, error: "NOT IMPLEMENTED" })
})

module.exports = userRouter
