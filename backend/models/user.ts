import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    membership: { type: String, default: 'none' },
  },
  { timestamps: true }
);

const model = mongoose.model('User', UserSchema);

export default model;
