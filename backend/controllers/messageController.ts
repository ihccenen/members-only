import { Request, Response } from 'express';
import Message from '../models/message';
import User from '../models/user';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';

const getAllMessages = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user as { isAdmin: boolean };
  const messages = await Message.find().populate({
    path: 'user',
    select: 'firstName lastName',
  });
  const allMessages =
    user && user.isAdmin
      ? messages
      : messages.map(({ title, message, _id }) => ({ title, message, _id }));

  res.status(200).json({ allMessages });
});

const createMessage = [
  body('title').trim().isLength({ min: 1 }).escape(),
  body('message').trim().isLength({ min: 1 }).escape(),
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) throw new Error('Invalid data');

    const user = req.user as any;

    if (!user) {
      res.status(400);

      throw new Error('User not logged');
    }

    const { title, message } = req.body;
    const { id } = user;

    const msg = new Message({ user: id, title, message });

    msg.save();

    res.status(201).json({ message: 'Message created successfully' });
  }),
];

const deleteMessage = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user as any;

  if (!user) {
    res.status(400);

    throw new Error('User not logged');
  }

  const { isAdmin } = user;

  if (!isAdmin) {
    res.status(400);

    throw new Error('Only admins are allowed to delete messages');
  }

  const { id } = req.params;

  await Message.findByIdAndDelete(id);

  res.status(200).json({ message: 'Message deleted successfully' });
});

export { getAllMessages, createMessage, deleteMessage };
