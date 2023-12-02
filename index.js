import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import db from './config/Database.js';
import dbw from './config/dbWilayah.js';
import jwt from 'jsonwebtoken';

// Routes
import router from './routes/index.js';
import tanamanPanganRouter from './routes/tanaman_pangan.js';
import dashboard from './routes/dashboard.js';
import holtikulturaRouter from './routes/hortikultura.js';
import lahanPertanianRouter from './routes/lahan_pertanian.js';
import kelompokTaniRouter from './routes/kelompok_tani.js';
import petaniRouter from './routes/petani.js';
import perkebunanRouter from './routes/perkebunan.js';
import curahHujanRouter from './routes/curah_hujan.js';
import statistikRouter from './routes/statistik.js';
import regionRouter from './routes/region.js';

import Users from './models/UserModel.js';
import Tanaman_pangan from './models/tanamanPanganModel.js';
import Petani from './models/petaniModel.js';
import Kelompok_tani from './models/kelompokTaniModel.js';
import Hortikultura from './models/hortikulturaModel.js';
import Lahan_pertanian from './models/lahanPertanianModel.js';
import Perkebunan from './models/perkebunanModel.js';
import Curah_hujan from './models/curahHujanModel.js';
import Komoditas_pertanian from './models/komoditasPertanianModel.js';

dotenv.config();
const app = express();
const port = 5000;

// app.use(cors(corsOptions));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

try {
  await db.authenticate();
  console.log('Database Connected...');
  await dbw.authenticate();
  console.log('Database Wilayah Connected...');
  await Users.sync();
  await Tanaman_pangan.sync();
  await Petani.sync();
  await Kelompok_tani.sync();
  await Hortikultura.sync();
  await Lahan_pertanian.sync();
  await Perkebunan.sync();
  await Curah_hujan.sync();
  await Komoditas_pertanian.sync();
} catch (error) {
  console.log(error);
}

app.use(router);
app.use(dashboard);
app.use(tanamanPanganRouter);
app.use(holtikulturaRouter);
app.use(lahanPertanianRouter);
app.use(kelompokTaniRouter);
app.use(petaniRouter);
app.use(perkebunanRouter);
app.use(curahHujanRouter);
app.use(statistikRouter);
app.use(regionRouter);

app.listen(port, () => console.log(`Server running at port ${port}`));
