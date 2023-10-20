const boom = require('@hapi/boom');

const { models }= require('./../libs/sequelize');

class ColorService {

    constructor(){
    }
    async create(data) {
      const newColor = await models.Color.create(data);
      return newColor;
    }
  
    async find() {
      const colors = await models.Color.findAll();
      return colors;
    }
  
    async findOne(id) {
      const color = await models.Color.findByPk(id, {
        include: ['items']
      });
      return color;
    }
  
    async update(id, changes) {
      try {
        const color = await models.Color.findByPk(id);
    
        if (!color) {
          throw boom.notFound('Color not found');
        }
    
        await color.update(changes);
    
        return color;
      } catch (error) {
        throw boom.badImplementation('Error updating color', error);
      }
    }
    
    async delete(id) {
      try {
        const color = await models.Color.findByPk(id);
    
        if (!color) {
          throw boom.notFound('Color not found');
        }
    
        await color.destroy();
    
        return { message: 'Color deleted successfully' };
      } catch (error) {
        throw boom.badImplementation('Error deleting color', error);
      }
    }
    
  
  }
  
  module.exports = ColorService;