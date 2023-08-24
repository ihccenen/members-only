import express from 'express';
import {
  createUser,
  loginUser,
  logoutUser,
  updateUserMembership,
} from '../controllers/userController';

const router = express.Router();

router.route('/').post(createUser).patch(updateUserMembership);
router.post('/log-in', loginUser);
router.post('/log-out', logoutUser);

export default router;
