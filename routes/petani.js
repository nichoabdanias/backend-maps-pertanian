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

petaniRouter.get('/petani', verifyToken, getPetani);
petaniRouter.get('/petani/:id', verifyToken, getPetaniById);
petaniRouter.post('/petani', verifyToken, postePetani);
petaniRouter.put('/petani/:id', verifyToken, updatePetani);
petaniRouter.delete('/petani/:id', verifyToken, deletePetani);

export default petaniRouter;
