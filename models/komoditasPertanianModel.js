import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const Komoditas_pertanian = db.define(
  'komoditas_pertanian',
  {
    nama_komoditas: {
      type: DataTypes.STRING,
    },
    harga_baru: {
      type: DataTypes.FLOAT,
    },
    harga_lama: {
      type: DataTypes.FLOAT,
    },
    nilai_perubahan: {
      type: DataTypes.FLOAT,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Komoditas_pertanian;
