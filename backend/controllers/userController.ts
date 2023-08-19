import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import passport from 'passport';
import { body } from 'express-validator';
import User from '../models/user';

const createUser = [
  body('firstName')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .isAlpha(),
  body('lastName')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .isAlpha(),
  body('email')
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
    const { firstName, lastName, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      
      throw new Error('Email already in use');
    }

    const user = new User({ firstName, lastName, email, password });

    if (!user) {
      res.status(400);

      throw new Error('Invalid user data');
    }

    user.save();

    res.status(201).json({ name: user.name, id: user._id});
  }),
];

const loginUser = [
  body('email')
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
  (req: Request, res: Response) => {
    const user = req.user as any;

    res.status(201).json({ name: user.name, id: user._id });
  },
];

export { createUser, loginUser };
