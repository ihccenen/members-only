import mongoose, { Model } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  password: string;
  membership: string;
}

interface IUserMethods {
  matchPassword(enteredPassword: string): boolean;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const { Schema } = mongoose;

const UserSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    membership: { type: String, default: 'none' },
  },
  { timestamps: true }
);

UserSchema.virtual('name').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.method('matchPassword', async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
});

const model = mongoose.model('User', UserSchema);

export default model;
