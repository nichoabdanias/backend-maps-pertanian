import express from 'express';
import {
  deleteCurahHujanById,
  getCurahHujan,
  getCurahHujanById,
  postCurahHujan,
  updateCurahHujan,
} from '../controllers/CurahHujanController.js';

const curahHujanRouter = express.Router();

curahHujanRouter.get('/curah-hujan', getCurahHujan);
curahHujanRouter.get('/curah-hujan/:id', getCurahHujanById);
curahHujanRouter.post('/curah-hujan/', postCurahHujan);
curahHujanRouter.put('/curah-hujan/:id', updateCurahHujan);
curahHujanRouter.delete('/curah-hujan/:id', deleteCurahHujanById);

export default curahHujanRouter;
