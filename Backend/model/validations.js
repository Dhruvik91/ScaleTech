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


let addBlogSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(500),
  content: z.string().min(1).max(10000),
  tags: z.string().transform((val, ctx) => {
    val = val.split(',');
    if (val.length > 10){
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "there should be at max 10 tags",
      });

      return z.NEVER;
    }
    for (let i=0; i<val.length; i++){
      val[i] = val[i].trim();
      
      if (val[i].length > 20 || val[i].length < 1){
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "length of tag should be between 1 to 20 inclusive",
        });
        
        return z.NEVER;
      }
    }

    return val;
  }).optional()
});


module.exports = {
  signUpSchema,
  signInSchema,
  addBlogSchema,
};