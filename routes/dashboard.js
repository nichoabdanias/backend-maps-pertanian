import express from 'express';
import {
  getJumlahKelompokTani,
  getJumlahLahanPertanian,
  getKelompokTani,
  getKomoditasUnggulan,
  getKomoditasUnggulanPertahun,
  getLahanPertanianPerTahun,
  getTotalPetani,
  getTotalPetaniPerTahun,
} from '../controllers/DashboardContoller.js';
import { getWeatherData } from '../controllers/CuacaController.js';
import { verifyToken } from '../midleware/VerifyToken.js';
// import { getLahanPertanian } from '../controllers/LahanPertanianController.js';
const dashboard = express.Router();

dashboard.get('/total_petani', verifyToken, getTotalPetani);
dashboard.get('/total_petani_pertahun', verifyToken, getTotalPetaniPerTahun);
dashboard.get('/jumlah_kelompok_tani', verifyToken, getJumlahKelompokTani);
dashboard.get('/kelompok_tani', verifyToken, getKelompokTani);
dashboard.get('/jumlah_lahan', verifyToken, getJumlahLahanPertanian);
dashboard.get('/jumlah_lahan_pertahun', verifyToken, getLahanPertanianPerTahun);
dashboard.get('/komoditas_unggulan', verifyToken, getKomoditasUnggulan);
dashboard.get(
  '/komoditas_unggulan_tahun',
  verifyToken,
  getKomoditasUnggulanPertahun
);
dashboard.get('/weather', getWeatherData);

export default dashboard;
