/*
  yarn|npm cross-env NODE_ENV=env.development sequelize db:migrate --name 20200519210101-create-user // create table
  yarn|npm cross-env NODE_ENV=env.development sequelize db:migrate // create all tables
  yarn|npm cross-env NODE_ENV=env.development sequelize db:migrate:undo --name 20200519210101-create-user // drop table
  yarn|npm cross-env NODE_ENV=env.development sequelize db:migrate:undo:all // drop all tables

  yarn|npm cross-env NODE_ENV=env.test sequelize db:migrate --name 20200519210101-create-user // create table
  yarn|npm cross-env NODE_ENV=env.test sequelize db:migrate // create all tables
  yarn|npm cross-env NODE_ENV=env.test sequelize db:migrate:undo --name 20200519210101-create-user // drop table
  yarn|npm cross-env NODE_ENV=env.test sequelize db:migrate:undo:all // drop all tables
*/
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user', {
      id: {
        type: process.env.NODE_ENV === 'env.test' ? Sequelize.INTEGER(11) : Sequelize.INTEGER(11).UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      username: {
        type: Sequelize.STRING(45),
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(60),
        allowNull: false
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
    return queryInterface.dropTable('user');
  }
};
