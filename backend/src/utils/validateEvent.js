const Joi = require("joi");

exports.validateEvent = (data, forCreation = true) => {
  const presence = forCreation ? "required" : "optional";
  const validationErrors = Joi.object({
    title: Joi.string().min(1).max(100).presence(presence),
    description: Joi.string().max(500).presence(presence),
    date: Joi.date().raw().presence(presence),
    site: Joi.string().min(1).max(50).presence(presence),
    userId: Joi.number().presence(presence),
  }).validate(data, { abortEarly: false }).error;
  if (validationErrors) {
    return validationErrors;
  }
  return false;
};
