const { Model, DataTypes, ValidationError } = require('sequelize');

const TABLE_NAME = 'email';
const EMAIL_VALIDATION = {
  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
  nameMaxLength: 64,
  addressMaxLength: 190
};

class Email extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: process.env.NODE_ENV === 'env.test' ? DataTypes.INTEGER(11) : DataTypes.INTEGER(11).UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING(255),
        required: true,
        validate: {
          _isEmail(value) {
            const email = value.split('@');
            if (!EMAIL_VALIDATION.pattern.test(value) || email[0].length > EMAIL_VALIDATION.nameMaxLength || email[1].length > EMAIL_VALIDATION.addressMaxLength) {
                throw new ValidationError(`'${value}' não é um e-mail válido`, []);
            }
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
        attributes: ['id', 'email']
      },
      hooks: {
        afterCreate: (email, options) => {
          const { dataValues } = email;
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

module.exports = Email;
