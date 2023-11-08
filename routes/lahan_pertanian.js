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
lahanPertanianRouter.post('/lahan_pertanian', verifyToken, postLahanPertanian);
lahanPertanianRouter.put(
  '/lahan_pertanian/:id',
  verifyToken, updateLahanPertanian
);
lahanPertanianRouter.delete('/lahan_pertanian/:id', verifyToken, deleteLahanPertanianById);

export default lahanPertanianRouter;
