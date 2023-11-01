import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const Perkebunan = db.define(
  'perkebunan',
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
    total_jumlah: {
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
export default Perkebunan;
