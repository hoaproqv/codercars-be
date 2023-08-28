const Joi = require("joi");

const editCarRequestBodySchema = Joi.object({
  make: Joi.string(),
  model: Joi.string(),
  release_date: Joi.number().integer().min(1900).max(new Date().getFullYear()),
  transmission_type: Joi.string().valid(
    "MANUAL",
    "AUTOMATIC",
    "AUTOMATED_MANUAL",
    "DIRECT_DRIVE",
    "UNKNOWN",
  ),
  price: Joi.number().integer().min(1000),
  size: Joi.string().valid("Compact", "Midsize", "Large"),
  style: Joi.string(),
})
  .required()
  .options({ abortEarly: false });

const validateEditCarRequest = (req, res, next) => {
  const validate = editCarRequestBodySchema.validate(req.body);
  if (validate.error) {
    return res.status(400).json({
      code: "BAD_REQUEST",
      errors: validate.error.details.map((item) => item.message),
    });
  }
  next();
};

module.exports = { validateEditCarRequest };
