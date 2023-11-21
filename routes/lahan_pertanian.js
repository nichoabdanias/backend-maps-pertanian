import express from 'express';
import {
  deleteLahanPertanianById,
  getLahanPertanian,
  postLahanPertanian,
  updateLahanPertanian,
} from '../controllers/LahanPertanianController.js';
import { verifyToken } from '../midleware/VerifyToken.js';

const lahanPertanianRouter = express.Router();

lahanPertanianRouter.get('/lahan_pertanian', getLahanPertanian);
lahanPertanianRouter.post('/lahan_pertanian', postLahanPertanian);
lahanPertanianRouter.put('/lahan_pertanian/:id', updateLahanPertanian);
lahanPertanianRouter.delete('/lahan_pertanian/:id', deleteLahanPertanianById);

export default lahanPertanianRouter;
