import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const Curah_hujan = db.define(
  'curah_hujan',
  {
    itensitas_hujan: {
      type: DataTypes.STRING,
    },
    bulan: {
      type: DataTypes.STRING,
    },
    tahun: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Curah_hujan;
