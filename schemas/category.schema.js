const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(1).max(20);
const genderId = Joi.number().integer();

const createCategorySchema = Joi.object({
  name: name.required(),
  genderId: genderId.required()
});

const updateCategorySchema = Joi.object({ 
  name: name,
  genderId: genderId,
});

const getCategorySchema = Joi.object({
  id: id.required(),
});

const deleteCategorySchema = Joi.object({
  id: id.required(),
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema,deleteCategorySchema }
