const { Model, DataTypes } = require('sequelize');

const hashGenerator = require('../utils/hashGenerator');

class User extends Model {
  static init(sequelize) {
    super.init({
      username: {
        type: DataTypes.STRING(45),
        unique: true,
        required: true
      },
      password: {
        type: DataTypes.STRING(60),
        required: true
      }
    }, {
      defaultScope: {
        attributes: {
          exclude: ['created_at', 'updated_at']
        }
      },
      hooks: {
        beforeCreate: (user, options) => {
          const { dataValues } = user;
          dataValues.username = dataValues.username.toLowerCase();
          dataValues.password = hashGenerator.generate(dataValues.password);
        },
        afterCreate: (user, options) => {
          const { dataValues } = user;
          delete dataValues.created_at;
          delete dataValues.updated_at;
        }
      },
      tableName: 'user',
      sequelize
    });
  }
}

module.exports = User;
