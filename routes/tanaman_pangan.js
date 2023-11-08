import express from 'express';
import {
  deleteTanamanPanganById,
  getTanamanPangan,
  getTanamanPanganById,
  postTanamanPangan,
  updateTanamanPangan,
} from '../controllers/TanamanPanganController.js';
import { verifyToken } from '../midleware/VerifyToken.js';

const tanamanPanganRouter = express.Router();

tanamanPanganRouter.get('/tanaman_pangan', verifyToken, getTanamanPangan); // get Pencarian
tanamanPanganRouter.get(
  '/tanaman_pangan/:id',
  verifyToken,
  getTanamanPanganById
);
tanamanPanganRouter.post('/tanaman_pangan/', verifyToken, postTanamanPangan);
tanamanPanganRouter.put(
  '/tanaman_pangan/:id',
  verifyToken,
  updateTanamanPangan
);
tanamanPanganRouter.delete(
  '/tanaman_pangan/:id',
  verifyToken,
  deleteTanamanPanganById
);

export default tanamanPanganRouter;
