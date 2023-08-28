z = require('zod');

let signUpSchema = z.object({
  firstName: z.string().min(1).max(30),
  lastName: z.string().min(1).max(30),
  userName: z.string().min(1).max(30),
  password: z.string(),
  email: z.string().min(1).max(30).email(),
});


let signInSchema = z.object({
  userName: z.string().min(1).max(30).optional(),
  email: z.string().min(1).max(30).email().optional(),
  password: z.string(),
}).refine(val => val.email !== undefined || val.userName !== undefined,{
  message: "atleast one of the following is required: email or userName",
});

module.exports = {
  signUpSchema,
  signInSchema,
};