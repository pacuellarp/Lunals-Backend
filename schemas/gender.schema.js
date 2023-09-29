const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(4).max(6);

const createGenderSchema = Joi.object({
  name: name.required(),
});

const updateGenderSchema = Joi.object({ 
  name: name,
});

const getGenderSchema = Joi.object({
  id: id.required(),
});

module.exports = { createGenderSchema, updateGenderSchema, getGenderSchema }