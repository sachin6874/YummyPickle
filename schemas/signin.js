import Joi from "joi";

const SignInSchema = Joi.object({
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
});

export { SignInSchema };
