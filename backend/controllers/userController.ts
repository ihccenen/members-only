import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { body } from 'express-validator';
import asyncHandler from 'express-async-handler';
import User from '../models/user';

const createUser = [
  body('username')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .isAlpha(),
  body('password')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .isAlpha(),

  asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;

    const userExists = await User.findOne({ username });

    if (userExists) {
      res.status(400);

      throw new Error('Username already in use');
    }

    bcrypt.hash(password, 10, async (err: Error, hashedPassword: string) => {
      if (err) {
        res.status(500);
        throw new Error(err.message);
      }

      const user = new User({ username, password: hashedPassword });

      if (!user) {
        res.status(400);

        throw new Error('Invalid user data');
      }

      user.save();

      res.status(201).json({ user });
    });
  }),
];

export { createUser };
