const { z } = require("zod");
const { v4 } = require('uuid');

const TAG_REGEX = /^[a-z0-9][a-z0-9-]{2,}[a-z0-9]$/

const TagValidation = z.string()
  .trim().min(4).transform(x => x.toLowerCase())
  .refine(tag => TAG_REGEX.test(tag), {
    message: "Only numbers and alphabets and dash (-) are allowed, can only start with alphabet or number."
  })

const BlogValidationSchema = z.object({
  id: z.string().default(v4),
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  content: z.string().trim().min(1),
  tags: z.string()
    .transform(x => x.split(",").map(y => y.trim()).filter(z => z !== ''))
    .pipe(z.array(TagValidation))
    .transform(tagArr => Array.from(new Set(tagArr))),
})

const USERNAME_REGEX = /^[a-z0-9]{4,20}$/

const simplePassword = z.string().trim().min(8)

// TODO, add email option 
const LoginUserSchema = z.object({
  username: z.string().trim()
    .transform(x => x.toLowerCase())
    .refine(val => USERNAME_REGEX.test(val), {
      message: "Only alphanumeric strings allowed in username, length between 4 and 20 characters."
    }),
  password: simplePassword,
})

const InsertUserSchema = LoginUserSchema.extend({
  last_name: z.string().trim().max(20).min(1),
  first_name: z.string().trim().max(20).min(1),
})

const PasswordSchema = z.object({
  password: simplePassword,
  passwordConfirm: simplePassword,
})

const addRefinement = (schema) => {
  return schema.refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  })
}

const PasswordValidationSchema = addRefinement(PasswordSchema)

//
const UserValidationSchema = addRefinement(InsertUserSchema.merge(PasswordSchema))

module.exports = {
  BlogValidationSchema,
  LoginUserSchema,
  UserValidationSchema,
  PasswordValidationSchema,
}
