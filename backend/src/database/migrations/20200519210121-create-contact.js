/*
  yarn|npm sequelize db:migrate --name 20200519210121-create-contact --env development // create table
  yarn|npm sequelize db:migrate --env development // create all tables
  yarn|npm sequelize db:migrate:undo --name 20200519210121-create-contact --env development // drop table
  yarn|npm sequelize db:migrate:undo:all --env development  // drop all tables

  yarn|npm sequelize db:migrate --name 20200519210121-create-contact --env test // create table
  yarn|npm sequelize db:migrate --env test // create all tables
  yarn|npm sequelize db:migrate:undo --name 20200519210121-create-contact --env test // drop table
  yarn|npm sequelize db:migrate:undo:all --env test  // drop all tables
*/
'use strict';

const env = process.env.NODE_ENV;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('contact', {
      id: {
        type: env === 'test' ? Sequelize.INTEGER(11) : Sequelize.INTEGER(11).UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      alias: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      user_id: {
        type: env === 'test' ? Sequelize.INTEGER(11) : Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: '0'
      },
      created_at: {
        type: Sequelize.DATE
      },
      updated_at: {
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('contact');
  }
};
