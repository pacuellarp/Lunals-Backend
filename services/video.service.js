const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class VideoService {
  constructor() {}
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
      include: ['product'],
    });
    return video;
  }

  async update(id, changes) {
    try {
      const video = await models.Video.findByPk(id);

      if (!video) {
        throw boom.notFound('Video not found');
      }

      await video.update(changes);

      return video;
    } catch (error) {
      throw boom.badImplementation('Error updating video', error);
    }
  }

  async delete(id) {
    try {
      const video = await models.Video.findByPk(id);

      if (!video) {
        throw boom.notFound('Video not found');
      }

      await video.destroy();

      return { message: 'Video deleted successfully' };
    } catch (error) {
      throw boom.badImplementation('Error deleting video', error);
    }
  }
}

module.exports = VideoService;
