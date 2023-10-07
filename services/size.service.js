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
      return {
        id,
        changes,
      };
    }
  
    async delete(id) {
      return { id };
    }
  
  }
  
  module.exports = SizeService;