import express from 'express';
import {
  createUser,
  loginUser,
  logoutUser,
} from '../controllers/userController';

const router = express.Router();

router.route('/').post(createUser);
router.route('/log-in').post(loginUser);
router.route('/log-out').post(logoutUser);

export default router;
