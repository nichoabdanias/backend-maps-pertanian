import { Sequelize } from 'sequelize';
import db from '../config/Database.js';

const { DataTypes } = Sequelize;

const Petani = db.define(
  'petani',
  {
    jenis_kelamin: {
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

export default Petani;
