const { Model, DataTypes } = require('sequelize');

const Phone = require('./Phone');
const Email = require('./Email');

const NAME_MIN_LENGTH = 3;
const NAME_MAX_LENGTH = 45;
const ALIAS_MIN_LENGTH = 3;
const ALIAS_MAX_LENGTH = 20;

class Contact extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: process.env.NODE_ENV === 'env.test' ? DataTypes.INTEGER(11) : DataTypes.INTEGER(11).UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(45),
        required: true,
        validate: {
          len: {
            args: [NAME_MIN_LENGTH, NAME_MAX_LENGTH],
            msg: `O campo destinado ao nome do contato deve ter de ${NAME_MIN_LENGTH} à ${NAME_MAX_LENGTH} caracteres`
          }
        }
      },
      alias: {
        type: DataTypes.STRING(20),
        required: true,
        validate: {
          len: {
            args: [ALIAS_MIN_LENGTH, ALIAS_MAX_LENGTH],
            msg: `O campo destinado ao apelido do contato deve ter de ${ALIAS_MIN_LENGTH} à ${ALIAS_MAX_LENGTH} caracteres`
          }
        }
      },
      user_id: {
        type: process.env.NODE_ENV === 'env.test' ? DataTypes.INTEGER(11) : DataTypes.INTEGER(11).UNSIGNED,
        required: true
      },
      deleted: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0,
        required: false
      }
    }, {
      defaultScope: {
        include: [{
          model: Phone,
          as: Phone.getTableName()
        },{
          model: Email,
          as: Email.getTableName()
        }],
        attributes: ['id', 'name', 'alias']
      },
      hooks: {
        afterCreate: (contact, options) => {
          const { dataValues } = contact;
          delete dataValues.user_id;
          delete dataValues.deleted;
          delete dataValues.created_at;
          delete dataValues.updated_at;
        }
      },
      tableName: 'contact',
      sequelize
    });
  }
}

module.exports = Contact;
