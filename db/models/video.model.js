const { Model, DataTypes, Sequelize } = require('sequelize');

const { PRODUCT_TABLE } = require('./product.model');

const VIDEO_TABLE = 'videos';

const VideoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}

class Video extends Model {
    static associate(models) {
        this.belongsTo(models.Product, { as: 'product' })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: VIDEO_TABLE,
      modelName: 'Video',
      timestamps: false
    }
  }
}



module.exports = { VIDEO_TABLE, VideoSchema, Video }
