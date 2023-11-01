import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const Kelompok_tani = db.define(
  'kelompok_tani',
  {
    nama_kelompok_tani: {
      type: DataTypes.STRING,
    },
    nomor_register: {
      type: DataTypes.STRING,
    },
    alamat: {
      type: DataTypes.STRING,
    },
    tahun_berdiri: {
      type: DataTypes.STRING,
    },
    nama_ketua: {
      type: DataTypes.STRING,
    },
    kecamatan: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Kelompok_tani;
