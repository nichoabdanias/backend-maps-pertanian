import express from 'express';
import {
  getHortikultura,
  getHortikulturaById,
  postHortikultura,
  updateHortukultura,
  deleteHortikulturaById,
} from '../controllers/HortikulturaController.js';

const holtikulturaRouter = express.Router();

holtikulturaRouter.get('/hortikultura', getHortikultura);
holtikulturaRouter.get('/hortikultura/:id', getHortikulturaById);
holtikulturaRouter.post('/hortikultura', postHortikultura);
holtikulturaRouter.put('/hortikultura/:id', updateHortukultura);
holtikulturaRouter.delete('/hortikultura/:id', deleteHortikulturaById);

export default holtikulturaRouter;
