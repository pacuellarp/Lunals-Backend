const boom = require('@hapi/boom');

const { models }= require('./../libs/sequelize');

class PhotoService {

    constructor(){
    }
    async create(data) {
      const newPhoto = await models.Photo.create(data);
      return newPhoto;
    }
  
    async find() {
      const photos = await models.Photo.findAll();
      return photos;
    }
  
    async findOne(id) {
      const photo = await models.Photo.findByPk(id, {
        include: ['product']
      });
      return photo;
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
  
  module.exports = PhotoService;