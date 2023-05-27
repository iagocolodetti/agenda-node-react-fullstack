/*
  yarn|npm cross-env NODE_ENV=env.development sequelize db:migrate --name 20200519210253-create-email // create table
  yarn|npm cross-env NODE_ENV=env.development sequelize db:migrate // create all tables
  yarn|npm cross-env NODE_ENV=env.development sequelize db:migrate:undo --name 20200519210253-create-email // drop table
  yarn|npm cross-env NODE_ENV=env.development sequelize db:migrate:undo:all // drop all tables

  yarn|npm cross-env NODE_ENV=env.test sequelize db:migrate --name 20200519210253-create-email // create table
  yarn|npm cross-env NODE_ENV=env.test sequelize db:migrate // create all tables
  yarn|npm cross-env NODE_ENV=env.test sequelize db:migrate:undo --name 20200519210253-create-email // drop table
  yarn|npm cross-env NODE_ENV=env.test sequelize db:migrate:undo:all // drop all tables
*/
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('email', {
      id: {
        type: process.env.NODE_ENV === 'env.test' ? Sequelize.INTEGER(11) : Sequelize.INTEGER(11).UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING(60),
        allowNull: false
      },
      contact_id: {
        type: process.env.NODE_ENV === 'env.test' ? Sequelize.INTEGER(11) : Sequelize.INTEGER(11).UNSIGNED,
        allowNull: false,
        references: {
          model: 'contact',
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
    return queryInterface.dropTable('email');
  }
};
