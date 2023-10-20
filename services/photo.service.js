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
      try {
        const photo = await models.Photo.findByPk(id);
    
        if (!photo) {
          throw boom.notFound('Photo not found');
        }
    
        await photo.update(changes);
    
        return photo;
      } catch (error) {
        throw boom.badImplementation('Error updating photo', error);
      }
    }
    
    async delete(id) {
      try {
        const photo = await models.Photo.findByPk(id);
    
        if (!photo) {
          throw boom.notFound('Photo not found');
        }
    
        await photo.destroy();
    
        return { message: 'Photo deleted successfully' };
      } catch (error) {
        throw boom.badImplementation('Error deleting photo', error);
      }
    }
    
  
  }
  
  module.exports = PhotoService;