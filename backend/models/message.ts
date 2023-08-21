import mongoose from 'mongoose';

const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

const model = mongoose.model('Message', MessageSchema);

export default model;
