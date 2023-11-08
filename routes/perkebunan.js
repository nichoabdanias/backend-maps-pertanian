import express from 'express';
import {
  deletePerkebunan,
  getPerkebunan,
  getPerkebunanById,
  postPerkebunan,
  updatePerkebunan,
} from '../controllers/PerkebunanController.js';
import { verifyToken } from '../midleware/VerifyToken.js';

const perkebunanRouter = express.Router();

perkebunanRouter.get('/perkebunan', verifyToken, getPerkebunan);
perkebunanRouter.get('/perkebunan/:id', verifyToken, getPerkebunanById);
perkebunanRouter.post('/perkebunan', verifyToken, postPerkebunan);
perkebunanRouter.put('/perkebunan/:id', verifyToken, updatePerkebunan);
perkebunanRouter.delete('/perkebunan/:id', verifyToken, deletePerkebunan);

export default perkebunanRouter;
