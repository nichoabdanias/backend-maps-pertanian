import express from 'express';
import {
  deleteKelompokTaniById,
  getDataKelompokTani,
  getDataKelompokTaniById,
  postKelompokTani,
  updateKelompokTani,
} from '../controllers/KelompokTaniController.js';
import { verifyToken } from '../midleware/VerifyToken.js';

const kelompokTaniRouter = express.Router();

// kelompokTaniRouter.get('/kelompok_tani/:id', kelompokTanibyId);
kelompokTaniRouter.get('/kelompok_petani', getDataKelompokTani);
kelompokTaniRouter.get('/kelompok_petani/:id', getDataKelompokTaniById);
kelompokTaniRouter.post('/kelompok_petani', postKelompokTani);
kelompokTaniRouter.put('/kelompok_petani/:id', updateKelompokTani);
kelompokTaniRouter.delete('/kelompok_petani/:id', deleteKelompokTaniById);

export default kelompokTaniRouter;
