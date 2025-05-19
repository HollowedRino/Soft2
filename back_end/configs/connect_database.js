import { Sequelize } from 'sequelize';

const connection = new Sequelize({
  dialect: 'sqlite',
  //storage: 'data_base/bd_01.db',
  storage: 'data_base/base_03.db',
});

export default connection;