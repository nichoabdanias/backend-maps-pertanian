import express from 'express';
import {
  deletePetani,
  getPetani,
  getPetaniById,
  postePetani,
  updatePetani,
} from '../controllers/PetaniController.js';
import { verifyToken } from '../midleware/VerifyToken.js';

const petaniRouter = express.Router();

petaniRouter.get('/petani', getPetani);
petaniRouter.get('/petani/:id', getPetaniById);
petaniRouter.post('/petani', postePetani);
petaniRouter.put('/petani/:id', updatePetani);
petaniRouter.delete('/petani/:id', deletePetani);

export default petaniRouter;
