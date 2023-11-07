import express from 'express';
import {
  getCurahHujanPertahun,
  getHargaKomoditas,
  getHortikulturaPerTahun,
  getProduksiPertanianHortikultura,
  getProduksiPertanianPerkebunan,
  getProduksiPertanianTanamanPangan,
  tanggal,
} from '../controllers/StastistikController.js';

const statistikRouter = express.Router();

statistikRouter.get('/tanggal', tanggal);
statistikRouter.get('/curah-hujan-pertahun', getCurahHujanPertahun);
statistikRouter.get(
  '/produksi-pertanian-hortikultura',
  getProduksiPertanianHortikultura
);
statistikRouter.get('/hortikultura-per-tahun/:tahun', getHortikulturaPerTahun);
// statistikRouter.get(
//   '/produksi-pertanian-hortikultura/:tahun',
//   getProduksiPertanianHortikultura
// );
statistikRouter.get(
  '/produksi-pertanian-tanamanpangan',
  getProduksiPertanianTanamanPangan
);
statistikRouter.get(
  '/produksi-pertanian-perkebunan',
  getProduksiPertanianPerkebunan
);
statistikRouter.get('/harga-komoditas', getHargaKomoditas);

export default statistikRouter;
