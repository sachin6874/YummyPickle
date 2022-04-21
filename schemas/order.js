import Joi from "joi";

const OrderSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        slug: Joi.string().required().error(new Error("invalid item slug")),
        price: Joi.number().required().error(new Error("invalid item price")),
        quantity: Joi.number()
          .required()
          .error(new Error("invalid item quantity")),
      }).required()
    )
    .required()
    .error(new Error("invalid items")),
  email: Joi.string().required().error(new Error("invalid email")),
  address: Joi.string()
    .max(50)
    .required()
    .error(new Error("invalid address line one")),
  card_cvv: Joi.string()
    .regex(new RegExp(/^[0-9].{2,5}$/))
    .required()
    .error(new Error("invalid card cvv")),
  card_expiry: Joi.string()
    .regex(new RegExp(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/))
    .required()
    .error(new Error("invalid card expiry")),
  card_holder: Joi.string()
    .max(30)
    .required()
    .error(new Error("invalid state")),
  card_number: Joi.string()
    .regex(new RegExp(/^[0-9].{12,20}$/))
    .required()
    .error(new Error("invalid card number")),
  city: Joi.string().max(30).required().error(new Error("invalid city")),
  state: Joi.string().max(30).required().error(new Error("invalid state")),
});

export { OrderSchema };
