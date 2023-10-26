const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(1).max(3);
const size1 = Joi.number().integer();
const size2 = Joi.number().integer();
const size3 = Joi.number().integer();
const size4 = Joi.number().integer();

const createSizeSchema = Joi.object({
  name: name.required(),
  size1: size1.required(),
  size2: size2.required(),
  size3: size3.required(),
  size4: size4.required(),
});

const updateSizeSchema = Joi.object({
  name: name,
  size1: size1,
  size2: size2,
  size3: size3,
  size4: size4,
});

const getSizeSchema = Joi.object({
  id: id.required(),
});

module.exports = { createSizeSchema, updateSizeSchema, getSizeSchema }
