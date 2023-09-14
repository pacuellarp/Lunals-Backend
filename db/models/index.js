const { Gender, GenderSchema } = require('./gender.model');
const { Size, SizeSchema } = require('./size.model');
const { Color, ColorSchema } = require('./color.model');
const { Category, CategorySchema } = require('./category.model');
const { SizeProduct, SizeProductSchema } = require('./size-product.model');
const { ColorProduct, ColorProductSchema } = require('./color-product.model')
const { Product, ProductSchema } = require('./product.model');
const { Photo, PhotoSchema } = require('./photo.model');
const { Video, VideoSchema } = require('./video.model');  


function setupModels(sequelize) {

  Gender.init(GenderSchema, Gender.config(sequelize));
  Size.init(SizeSchema, Size.config(sequelize));
  Color.init(ColorSchema, Color.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  SizeProduct.init(SizeProductSchema, SizeProduct.config(sequelize));
  ColorProduct.init(ColorProductSchema, ColorProduct.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Photo.init(PhotoSchema, Photo.config(sequelize));
  Video.init(VideoSchema, Video.config(sequelize));


  Gender.associate(sequelize.models);
  Size.associate(sequelize.models);
  Color.associate(sequelize.models);
  Category.associate(sequelize.models);
  SizeProduct.associate(sequelize.models);
  ColorProduct.associate(sequelize.models);
  Product.associate(sequelize.models);
  Photo.associate(sequelize.models);
  Video.associate(sequelize.models);
}

module.exports = setupModels;
