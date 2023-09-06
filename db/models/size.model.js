const { Model, DataTypes, Sequelize } = require('sequelize');

const SIZE_TABLE = 'sizes';

const SizeSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      size1: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      size2: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      size3: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      size4: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
}

class Size extends Model {

    static associate(models) {
        this.belongsToMany(models.Product, {
            as: 'items',
            through: models.SizeProduct,
            foreignKey: 'sizeId',
            otherKey: 'productId'
        });
    }
    
    static config(sequelize) {
        return {
            sequelize,
            tableName: SIZE_TABLE,
            modelName: 'Size',
            timestamps: false
        }
    }
}
      
      
module.exports = { Size, SIZE_TABLE, SizeSchema}