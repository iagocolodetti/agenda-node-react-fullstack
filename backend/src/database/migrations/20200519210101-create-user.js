/*
  yarn|npm sequelize db:migrate --name 20200519210101-create-user --env development // create table
  yarn|npm sequelize db:migrate --env development // create all tables
  yarn|npm sequelize db:migrate:undo --name 20200519210101-create-user --env development // drop table
  yarn|npm sequelize db:migrate:undo:all --env development  // drop all tables

  yarn|npm sequelize db:migrate --name 20200519210101-create-user --env test // create table
  yarn|npm sequelize db:migrate --env test // create all tables
  yarn|npm sequelize db:migrate:undo --name 20200519210101-create-user --env test // drop table
  yarn|npm sequelize db:migrate:undo:all --env test  // drop all tables
*/
'use strict';

const env = process.env.NODE_ENV;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user', {
      id: {
        type: env === 'test' ? Sequelize.INTEGER(11) : Sequelize.INTEGER(11).UNSIGNED,
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
