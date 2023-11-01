import { Sequelize } from 'sequelize';
const dbw = new Sequelize('indonesia', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default dbw;
