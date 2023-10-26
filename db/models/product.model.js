const { Model, DataTypes, Sequelize } = require('sequelize');

const { CATEGORY_TABLE } = require('./category.model');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  reference: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  overview: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  material: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
}


class Product extends Model {

  static associate(models) {
    this.belongsTo(models.Category, { as: 'category' });
    this.hasMany(models.Photo, {
      as: 'photos',
      foreignKey: 'productId'
    });
    this.hasMany(models.Video, {
      as: 'videos',
      foreignKey: 'productId'
    });
    this.belongsToMany(models.Size, {
      as: 'sizes',
      through: models.SizeProduct,
      foreignKey: 'product_id',
      otherKey: 'size_id'
     });
    this.belongsToMany(models.Color, {
      as: 'colors',
      through: models.ColorProduct,
      foreignKey: 'product_id',
      otherKey: 'color_id'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}

module.exports = { Product, ProductSchema, PRODUCT_TABLE };
