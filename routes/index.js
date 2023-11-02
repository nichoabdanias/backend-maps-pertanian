import express from 'express';
import {
  getUsers,
  Register,
  Login,
  Logout,
  getTes,
} from '../controllers/Users.js';
import { verifyToken } from '../midleware/VerifyToken.js';
import { refreshToken } from '../controllers/RefreshToken.js';

const router = express.Router();

router.get('/', getTes);
router.get('/users', verifyToken, getUsers);
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

export default router;
