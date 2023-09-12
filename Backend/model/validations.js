z = require('zod');

let usernameRegex = /^[a-z0-9_]{1,30}$/i;
let tagRegex = /^[a-z0-9_]{1,30}$/i;

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
}).refine(val => val.email !== undefined || val.userName !== undefined,{
  message: "atleast one of the following is required: email or userName",
});

let tagsSchema = z.string().transform((val, ctx) => {
  val = val.split(',');
  if (val.length > 10){
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "there should be at max 10 tags",
    });

    return z.NEVER;
  }
  
  if (val.length == 1 && val[0].trim() === '') return undefined;

  for (let i=0; i<val.length; i++){
    val[i] = val[i].trim();
    
    if (val[i].length > 20 || val[i].length < 1){
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "length of tag should be between 1 to 20 inclusive",
      });
      
      return z.NEVER;
    }

    if (!tagRegex.test(val[i])){
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "tag can only contain alphanumeric character and underscore",
      });

      return z.NEVER;
    }
  }

  return val;
}).optional()

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
