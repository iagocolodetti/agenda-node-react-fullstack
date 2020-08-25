const { join } = require('path');

module.exports = {
  development: {
    database: 'agenda',
    username: 'root',
    password: 'root',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: true,
      underscored: true
    }
  },
  test: {
    database: 'agenda',
    username: '',
    password: '',
    dialect: 'sqlite',
    storage: join(__dirname, '../database/agenda.sqlite'),
    logging: false,
    define: {
      timestamps: true,
      underscored: true
    }
  }
}
