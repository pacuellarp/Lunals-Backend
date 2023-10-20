const boom = require('@hapi/boom');

const { models }= require('./../libs/sequelize');

class SizeService {

    constructor(){
    }
    async create(data) {
      const newSize = await models.Size.create(data);
      return newSize;
    }
  
    async find() {
      const sizes = await models.Size.findAll();
      return sizes;
    }
  
    async findOne(id) {
      const size = await models.Size.findByPk(id, {
        include: ['items']
      });
      return size;
    }
  
    async update(id, changes) {
      try {
        const size = await models.Size.findByPk(id);
    
        if (!size) {
          throw boom.notFound('Size not found');
        }
    
        await size.update(changes);
    
        return size;
      } catch (error) {
        throw boom.badImplementation('Error updating size', error);
      }
    }
    
    async delete(id) {
      try {
        const size = await models.Size.findByPk(id);
    
        if (!size) {
          throw boom.notFound('Size not found');
        }
    
        await size.destroy();
    
        return { message: 'Size deleted successfully' };
      } catch (error) {
        throw boom.badImplementation('Error deleting size', error);
      }
    }
    
  }
  
  module.exports = SizeService;