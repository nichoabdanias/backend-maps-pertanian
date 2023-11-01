import express from 'express';
import {
  deletePerkebunan,
  getPerkebunan,
  getPerkebunanById,
  postPerkebunan,
  updatePerkebunan,
} from '../controllers/PerkebunanController.js';

const perkebunanRouter = express.Router();

perkebunanRouter.get('/perkebunan', getPerkebunan);
perkebunanRouter.get('/perkebunan/:id', getPerkebunanById);
perkebunanRouter.post('/perkebunan', postPerkebunan);
perkebunanRouter.put('/perkebunan/:id', updatePerkebunan);
perkebunanRouter.delete('/perkebunan/:id', deletePerkebunan);

export default perkebunanRouter;
