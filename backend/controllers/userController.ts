import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import passport from 'passport';
import { body } from 'express-validator';
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

    const user = new User({ username, password });

    if (!user) {
      res.status(400);

      throw new Error('Invalid user data');
    }

    user.save();

    res.status(201).json({ username: user.username, id: user._id});
  }),
];

const loginUser = [
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
  passport.authenticate('local'),
  asyncHandler(async (req: Request, res: Response) => {
    const user = req.user as any

    res.status(201).json({ username: user.username, id: user._id });
  }),
];

export { createUser, loginUser };
