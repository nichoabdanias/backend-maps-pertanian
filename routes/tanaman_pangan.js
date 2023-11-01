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

tanamanPanganRouter.get('/tanaman_pangan', getTanamanPangan); // get Pencarian
tanamanPanganRouter.get('/tanaman_pangan/:id', getTanamanPanganById);
tanamanPanganRouter.post('/tanaman_pangan/', postTanamanPangan);
tanamanPanganRouter.put('/tanaman_pangan/:id', updateTanamanPangan);
tanamanPanganRouter.delete('/tanaman_pangan/:id', deleteTanamanPanganById);

export default tanamanPanganRouter;
