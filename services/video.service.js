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
      return {
        id,
        changes,
      };
    }
  
    async delete(id) {
      return { id };
    }
  
  }
  
  module.exports = VideoService;