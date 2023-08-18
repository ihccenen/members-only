import express from 'express';
import { createUser, loginUser } from '../controllers/userController';

const router = express.Router();

router.route('/').post(createUser);
router.route('/log-in').post(loginUser);

export default router;
