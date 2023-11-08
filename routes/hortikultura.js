import express from 'express';
import {
  getHortikultura,
  getHortikulturaById,
  postHortikultura,
  updateHortukultura,
  deleteHortikulturaById,
} from '../controllers/HortikulturaController.js';
import { verifyToken } from '../midleware/VerifyToken.js';

const holtikulturaRouter = express.Router();

holtikulturaRouter.get('/hortikultura', verifyToken, getHortikultura);
holtikulturaRouter.get('/hortikultura/:id', verifyToken, getHortikulturaById);
holtikulturaRouter.post('/hortikultura', verifyToken, postHortikultura);
holtikulturaRouter.put('/hortikultura/:id', verifyToken, updateHortukultura);
holtikulturaRouter.delete(
  '/hortikultura/:id',
  verifyToken,
  deleteHortikulturaById
);

export default holtikulturaRouter;
