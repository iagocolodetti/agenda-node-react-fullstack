const { Model, DataTypes } = require('sequelize');

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
      tableName: 'user',
      sequelize
    });
  }
}

module.exports = User;
