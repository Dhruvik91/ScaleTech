z = require('zod');

let usernameRegex = /^[a-z0-9_]{1,30}$/i;
let tagRegex = /^[a-z0-9_]+$/i;

// todo : add confirm password refinement
let signUpSchema = z.object({
  // TODO : trim all strings
  firstName: z.string().min(1).max(30),
  lastName: z.string().min(1).max(30),
  userName: z.string().min(1).max(30).refine(val => usernameRegex.test(val), {
    message: "username can only contain alphanumeric characters and underscore"
  }),
  // todo: trim and set minimum length
  password: z.string(),
  email: z.string().min(1).max(30).email(),
});


let signInSchema = z.object({
  userName: z.string().min(1).max(30).optional(),
  email: z.string().min(1).max(30).email().optional(),
  password: z.string(),
}).refine(val => val.email !== undefined || val.userName !== undefined, {
  message: "atleast one of the following is required: email or userName",
});

const SingleTagValidation = z.string()
  .trim().min(1).max(20).transform(x => x.toLowerCase())
  .refine(tag => tagRegex.test(tag), {
    message: "tag can only contain alphanumeric character and underscore"
  })

let tagsSchema = z
  .string()
  .transform(x =>
    x.split(',').map(y => y.trim()).filter(z => z !== '')
  )
  .pipe(z.array(SingleTagValidation).max(10))
  .transform(x => Array.from(new Set(x)))

let addBlogSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  content: z.string().min(1).max(10000),
  tags: tagsSchema
});


let usernameSchema = z.string().min(1).max(30).refine(val => usernameRegex.test(val), {
  message: "username can only contain alphanumeric characters and underscore"
});

module.exports = {
  signUpSchema,
  signInSchema,
  addBlogSchema,
  usernameSchema,
  tagsSchema,
};
