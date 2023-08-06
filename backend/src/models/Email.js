const { Model, DataTypes } = require('sequelize');

class Email extends Model {
  static init(sequelize) {
    super.init({
      email: {
        type: DataTypes.STRING(60),
        required: true
      },
      contact_id: {
        type: process.env.NODE_ENV === 'env.test' ? DataTypes.INTEGER(11) : DataTypes.INTEGER(11).UNSIGNED,
        required: true
      },
      deleted: {
        type: DataTypes.TINYINT(1),
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
      tableName: 'email',
      sequelize
    });
  }

  static getTableName() {
    return 'email';
  }
}

module.exports = Email;
