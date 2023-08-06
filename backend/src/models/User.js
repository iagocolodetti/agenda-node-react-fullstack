const { Model, DataTypes, ValidationError } = require('sequelize');
const hashGenerator = require('../utils/hashGenerator');

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 45;
const PASSWORD_MIN_LENGTH = 3;
const PASSWORD_MAX_LENGTH = 32;

class User extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: process.env.NODE_ENV === 'env.test' ? DataTypes.INTEGER(11) : DataTypes.INTEGER(11).UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING(45),
        unique: true,
        required: true,
        validate: {
          len: {
            args: [USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH],
            msg: `O campo destinado ao nome de usuário deve ter de ${USERNAME_MIN_LENGTH} à ${USERNAME_MAX_LENGTH} caracteres`
          }
        }
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
          if (dataValues.password.length < PASSWORD_MIN_LENGTH || dataValues.password.length > PASSWORD_MAX_LENGTH) {
              throw new ValidationError(`O campo destinado a senha deve ter de ${PASSWORD_MIN_LENGTH} à ${PASSWORD_MAX_LENGTH} caracteres`, []);
          } else {
              dataValues.username = dataValues.username.toLowerCase();
              dataValues.password = hashGenerator.generate(dataValues.password);
          }
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
