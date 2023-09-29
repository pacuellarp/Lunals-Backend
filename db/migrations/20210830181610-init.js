'use strict';

const { GENDER_TABLE } = require('./../models/gender.model');
const { SIZE_TABLE } = require('./../models/size.model');
const { COLOR_TABLE } = require('./../models/color.model');
const { SIZE_PRODUCT_TABLE } = require('./../models/size-product.model');
const { COLOR_PRODUCT_TABLE } = require('./../models/color-product.model');
const { CATEGORY_TABLE } = require('./../models/category.model');
const { PRODUCT_TABLE } = require('./../models/product.model');



module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable(GENDER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    });

    await queryInterface.createTable(SIZE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      size1: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      size2: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      size3: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      size4: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
    });

    await queryInterface.createTable(COLOR_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      hexCode: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    });

    await queryInterface.createTable(SIZE_PRODUCT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      sizeId: {
        field: 'size_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: SIZE_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      productId: {
        field: 'product_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: PRODUCT_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });

    await queryInterface.createTable(COLOR_PRODUCT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      colorId: {
        field: 'color_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: COLOR_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      productId: {
        field: 'product_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: PRODUCT_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });

    await queryInterface.createTable(CATEGORY_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      genderId: {
        field: 'gender_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: GENDER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
    });
    await queryInterface.createTable(PRODUCT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      categoryId: {
        field: 'category_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: CATEGORY_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      reference: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      overview: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      material: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface) => {

    await queryInterface.dropTable(GENDER_TABLE);
    await queryInterface.dropTable(SIZE_TABLE);
    await queryInterface.dropTable(COLOR_TABLE);
    await queryInterface.dropTable(SIZE_PRODUCT_TABLE);
    await queryInterface.dropTable(COLOR_PRODUCT_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);

  }
};
