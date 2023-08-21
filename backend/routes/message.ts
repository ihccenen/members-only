import express from 'express';
import {
  createMessage,
  deleteMessage,
  getAllMessages,
} from '../controllers/messageController';

const router = express.Router();

router.route('/').get(getAllMessages).post(createMessage);
router.route('/:id').delete(deleteMessage);

export default router;
