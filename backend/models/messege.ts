import mongoose from 'mongoose';

const { Schema } = mongoose;

const MessageSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true },
  text: { type: String, required: true },
});
