const { Sequelize } = require('sequelize');

const connection = new Sequelize({
  dialect: 'sqlite',
  //storage: 'data_base/bd_01.db',
  storage: 'data_base/base_03.db',
});

module.exports = connection;