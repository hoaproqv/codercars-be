const Joi = require("joi");

const createCarRequestBodySchema = Joi.object()
  .keys({
    make: Joi.string().required(),
    model: Joi.string().required(),
    release_date: Joi.number()
      .integer()
      .min(1900)
      .max(new Date().getFullYear())
      .required(),
    transmission_type: Joi.string()
      .valid(
        "MANUAL",
        "AUTOMATIC",
        "AUTOMATED_MANUAL",
        "DIRECT_DRIVE",
        "UNKNOWN",
      )
      .required(),
    price: Joi.number().integer().min(1000).required(),
    size: Joi.string().valid("Compact", "Midsize", "Large").required(),
    style: Joi.string().required(),
  })
  .required()
  .options({ abortEarly: false });

const validateCreateCarRequest = (req, res, next) => {
  const validate = createCarRequestBodySchema.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      code: "BAD_REQUEST",
      errors: validate.error.details.map((item) => item.message),
    });
  }
  next();
};
module.exports = { validateCreateCarRequest };
