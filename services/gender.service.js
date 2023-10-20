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
      try {
  
        const gender = await models.Gender.findByPk(id);
    
        if (!gender) {
          throw boom.notFound('Gender not found');
        }
  
        await gender.update(changes);
    
        return gender;
      } catch (error) {
        throw boom.badImplementation('Error updating gender', error);
      }
    }
  
    async delete(id) {
      try {

        const gender = await models.Gender.findByPk(id);
    
        if (!gender) {
          throw boom.notFound('Gender not found');
        }

        await gender.destroy();
    

        return { message: 'Gender deleted successfully' };
      } catch (error) {
        throw boom.badImplementation('Error deleting gender', error);
      }
    }
    
  
  }
  
  module.exports = GenderService;