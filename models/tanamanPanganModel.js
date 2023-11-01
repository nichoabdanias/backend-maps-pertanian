import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const Tanaman_pangan = db.define(
  'tanaman_pangan',
  {
    jenis_komoditas: {
      type: DataTypes.STRING,
    },
    kecamatan: {
      type: DataTypes.STRING,
    },
    desa: {
      type: DataTypes.STRING,
    },
    total: {
      type: DataTypes.INTEGER,
    },
    tahun: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Tanaman_pangan;
