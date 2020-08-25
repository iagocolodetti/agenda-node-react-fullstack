const { Model, DataTypes } = require('sequelize');

const env = process.env.NODE_ENV;

class Phone extends Model {
  static init(sequelize) {
    super.init({
      phone: {
        type: DataTypes.STRING(20),
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
      tableName: 'phone',
      sequelize
    });
  }
}

module.exports = Phone;
