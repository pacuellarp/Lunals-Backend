const boom = require('@hapi/boom');

const { models }= require('./../libs/sequelize');

class VideoService {

    constructor(){
    }
    async create(data) {
      const newVideo = await models.Video.create(data);
      return newVideo;
    }
  
    async find() {
      const videos = await models.Video.findAll();
      return videos;
    }
  
    async findOne(id) {
      const video = await models.Video.findByPk(id, {
        include: ['product']
      });
      return video;
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
  
  module.exports = VideoService;