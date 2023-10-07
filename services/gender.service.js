const boom = require('@hapi/boom');

const { models }= require('./../libs/sequelize');

class GenderService {

    constructor(){
    }
    async create(data) {
      const newGender = await models.Gender.create(data);
      return newGender;
    }
  
    async find() {
      const genders = await models.Gender.findAll();
      return genders;
    }
  
    async findOne(id) {
      const gender = await models.Gender.findByPk(id, {
        include: ['categories']
      });
      return gender;
    }
  
    async update(id, changes) {
      return {
        id,
        changes,
      };
    }
  
    async delete(id) {
      return { id };
    }
  
  }
  
  module.exports = GenderService;