const { Model, DataTypes } = require('sequelize');

const env = process.env.NODE_ENV;

class Email extends Model {
  static init(sequelize) {
    super.init({
      email: {
        type: DataTypes.STRING(60),
        required: true
      },
      contact_id: {
        type: env === 'test' ? DataTypes.INTEGER(11) : DataTypes.INTEGER(11).UNSIGNED,
        required: true
      },
      deleted: {
        type: DataTypes.TINYINT(1),
        required: false
      }
    }, {
      tableName: 'email',
      sequelize
    });
  }
}

module.exports = Email;
