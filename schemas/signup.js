import Joi from "joi";

const SignUpSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required()
    .error(new Error("invalid email")),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{6,25}$"))
    .required()
    .error(new Error("invalid password")),
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .error(new Error("invalid username")),
});

export { SignUpSchema };
