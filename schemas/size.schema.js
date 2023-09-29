const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(1).max(3);
const side1 = Joi.number().integer();
const side2 = Joi.number().integer();
const side3 = Joi.number().integer();
const side4 = Joi.number().integer();

const createSizeSchema = Joi.object({
  name: name.required(),
  side1: side1.required(),
  side2: side2.required(),
  side3: side3.required(),
  side4: side4.required(),
});

const updateSizeSchema = Joi.object({
  name: name,
  side1: side1,
  side2: side2,
  side3: side3,
  side4: side4,
});

const getSizeSchema = Joi.object({
  id: id.required(),
});

module.exports = { createSizeSchema, updateSizeSchema, getSizeSchema }
