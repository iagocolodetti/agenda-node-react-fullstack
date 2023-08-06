const { Model, DataTypes } = require('sequelize');

const Phone = require('./Phone');
const Email = require('./Email');

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
