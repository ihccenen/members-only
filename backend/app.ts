import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { Strategy as LocalStrategy } from 'passport-local';
import connectDB from './config/db';
import userRouter from './routes/user';
import User from './models/user';
import { errorHandler, notFound } from './middleware/errorMiddleware';
import messageRouter from './routes/message';

const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(helmet());
app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email: string, password: string, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'Incorrect email' });
        }

        const match = await user.matchPassword(password);

        if (!match) {
          return done(null, false, { message: 'Incorrect password' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser(function (user: any, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then((res) => done(null, res))
    .catch(done);
});

app.use('/api/users', userRouter);

app.use('/api/messages', messageRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
