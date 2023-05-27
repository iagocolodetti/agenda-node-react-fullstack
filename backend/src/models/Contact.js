const { Model, DataTypes } = require('sequelize');

class Contact extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING(45),
        required: true
      },
      alias: {
        type: DataTypes.STRING(20),
        required: true
      },
      user_id: {
        type: process.env.NODE_ENV === 'env.test' ? DataTypes.INTEGER(11) : DataTypes.INTEGER(11).UNSIGNED,
        required: true
      },
      deleted: {
        type: DataTypes.TINYINT(1),
        required: false
      }
    }, {
      tableName: 'contact',
      sequelize
    });
  }
}

module.exports = Contact;
