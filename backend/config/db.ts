import mongoose from 'mongoose';

export default function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI!)
    .then((res) => console.log(`MongoDB Connected: ${res.connection.host}`))
    .catch((err) => {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    });
}
