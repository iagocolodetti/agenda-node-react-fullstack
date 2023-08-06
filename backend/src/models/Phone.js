const { Model, DataTypes } = require('sequelize');

const TABLE_NAME = 'phone';
const PHONE_MIN_LENGTH = 3;
const PHONE_MAX_LENGTH = 20;

class Phone extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: process.env.NODE_ENV === 'env.test' ? DataTypes.INTEGER(11) : DataTypes.INTEGER(11).UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      phone: {
        type: DataTypes.STRING(20),
        required: true,
        validate: {
          len: {
            args: [PHONE_MIN_LENGTH, PHONE_MAX_LENGTH],
            msg: `O campo destinado ao telefone deve ter de ${PHONE_MIN_LENGTH} à ${PHONE_MAX_LENGTH} caracteres`
          }
        }
      },
      contact_id: {
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
        where: { deleted: false },
        attributes: ['id', 'phone']
      },
      hooks: {
        afterCreate: (phone, options) => {
          const { dataValues } = phone;
          delete dataValues.contact_id;
          delete dataValues.deleted;
          delete dataValues.created_at;
          delete dataValues.updated_at;
        }
      },
      tableName: TABLE_NAME,
      sequelize
    });
  }

  static getTableName() {
    return TABLE_NAME;
  }
}

module.exports = Phone;
