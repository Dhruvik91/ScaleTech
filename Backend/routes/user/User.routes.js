const { Router } = require("express")
const { addSignUpInfo, checkSignInInfo } = require("./User.service")
const { signUpSchema, signInSchema } = require("../../model/validations");

const userRouter = Router()

// LOGIN
userRouter.post('/signIn', async (req, res) => {
  let validatedData = signInSchema.safeParse(req.body);

  if (validatedData.success){
    let response = await checkSignInInfo(validatedData.data.userName, validatedData.data.email, validatedData.data.password);
    res.json(response);
    return ;
  }
  res.json({
    success: false,
    errorMessage: validatedData.error,
  });
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
userRouter.post('/signUp', async (req, res) => {
  let validatedData = signUpSchema.safeParse(req.body);

  if (validatedData.success){
    let response = await addSignUpInfo(validatedData.data.firstName, validatedData.data.lastName,
       validatedData.data.email, validatedData.data.password, validatedData.data.userName);
    
    res.json(response);
    return ;
  }
  res.json({
    success: false,
    errorMessage: validatedData.error,
  });
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
