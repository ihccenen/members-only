import { Request, Response } from 'express';
import Message from '../models/message';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';

const getAllMessages = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  const messages = await Message.find().populate({
    path: 'user',
    select: 'firstName lastName',
  });
  const allMessages = user
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

  const userId = user.id;
  const { id } = req.params;

  const message = await Message.findById(id);

  if (message?.user?.toString() !== userId) {
    res.status(400);

    throw new Error('Not allowed to delete message');
  }

  await Message.findByIdAndDelete(id);

  res.status(200).json({ message: 'Message deleted successfully' });
});

export { getAllMessages, createMessage, deleteMessage };
