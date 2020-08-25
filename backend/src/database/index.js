const { Sequelize } = require('sequelize');
const dbConfig = require('../configs/database');

const User = require('../models/User');
const Contact = require('../models/Contact');
const Phone = require('../models/Phone');
const Email = require('../models/Email');

const sequelize = new Sequelize(dbConfig[process.env.NODE_ENV]);

module.exports = {
  async connect() {
    try {
      await sequelize.authenticate();
      User.init(sequelize);
      Contact.init(sequelize);
      Phone.init(sequelize);
      Email.init(sequelize);
      Contact.hasMany(Phone, { as: Phone.tableName, foreignKey: 'contact_id' });
      Contact.hasMany(Email, { as: Email.tableName, foreignKey: 'contact_id' });
      console.log('Conexão estabelecida com o banco de dados.');
    } catch (error) {
      console.log(error);
      console.log('Não foi possível estabelecer a conexão com o banco de dados.');
    }
  },

  async close() {
    await sequelize.close();
  },

  async getTransaction() {
    return await sequelize.transaction();
  }
}
