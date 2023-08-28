z = require('zod');

let signUpSchema = z.object({
  firstName: z.string().min(1).max(30),
  lastName: z.string().min(1).max(30),
  userName: z.string().min(1).max(30),
  password: z.string(),
  email: z.string().email(),
});


module.exports = {
  signUpSchema,
};