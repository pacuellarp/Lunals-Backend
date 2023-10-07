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
      return {
        id,
        changes,
      };
    }
  
    async delete(id) {
      return { id };
    }
  
  }
  
  module.exports = ColorService;