import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import passport from 'passport';
import { body, validationResult } from 'express-validator';
import User from '../models/user';

const createUser = [
  body('firstName')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('lastName')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('email')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('password')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const { firstName, lastName, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);

      throw new Error('Email already in use');
    }

    if (!errors.isEmpty()) {
      res.status(400);

      throw new Error('Invalid user data');
    }

    const user = new User({ firstName, lastName, email, password });

    user.save();

    req.logIn(user, (err) => {
      if (err) return next(err);

      res.status(201).json({ name: user.name, id: user._id });
    });
  }),
];

const loginUser = [
  body('email')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('password')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  passport.authenticate('local'),
  (req: Request, res: Response) => {
    const user = req.user as any;

    res.status(201).json({ name: user.name, id: user._id });
  },
];

const logoutUser = (req: Request, res: Response, next: NextFunction) => {
  req.logOut(function (err) {
    if (err) return next(err);

    res.status(200).json({ message: 'Logged out successfully' });
  });
};

export { createUser, loginUser, logoutUser };
