const { join } = require('path');

module.exports = () => {
  
  let db_config = {
    database: process.env.DB,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
    logging: (/true/i).test(process.env.DB_LOGGING),
    define: {
      timestamps: true,
      underscored: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  };

  if (process.env.NODE_ENV === 'env.test') {
    db_config = {
      ...db_config,
      storage: join(__dirname, '../../', process.env.DB_STORAGE)
    };
  } else {
    db_config = {
      ...db_config,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT
    };
  }

  return db_config;
}
