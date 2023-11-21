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

dashboard.get('/total_petani', getTotalPetani);
dashboard.get('/total_petani_pertahun', getTotalPetaniPerTahun);
dashboard.get('/jumlah_kelompok_tani', getJumlahKelompokTani);
dashboard.get('/kelompok_tani', getKelompokTani);
dashboard.get('/jumlah_lahan', getJumlahLahanPertanian);
dashboard.get('/jumlah_lahan_pertahun', getLahanPertanianPerTahun);
dashboard.get('/komoditas_unggulan', getKomoditasUnggulan);
dashboard.get('/komoditas_unggulan_tahun', getKomoditasUnggulanPertahun);
dashboard.get('/weather', getWeatherData);

export default dashboard;
