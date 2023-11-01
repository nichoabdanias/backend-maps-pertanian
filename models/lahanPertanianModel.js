import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const Lahan_pertanian = db.define(
  'lahan_pertanian',
  {
    jenis_lahan: {
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

export default Lahan_pertanian;
