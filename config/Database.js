import { Sequelize } from 'sequelize';
const db = new Sequelize('db_maps_pertanian', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default db;
