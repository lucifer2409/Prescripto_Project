import connectDB from './config/mongodb.js';
import mongoose from 'mongoose';

// Simple schema for testing
const userSchema = new mongoose.Schema({
    name: { type: String, default: "Name" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    gender: { type: String, default: "Not Selected" },
    dob: { type: String, default: "Not Selected" },
    phone: { type: String, default: "0000000000" },
  });

// This will ensure model is only created once
const User = mongoose.models.User || mongoose.model('User', userSchema);

const testConnection = async () => {
  await connectDB();
  console.log('Test DB Connection worked!');
  // Test if User model works
  const users = await User.find({});
  console.log(users);
};

testConnection().catch(err => {
  console.error('Error during testing:', err);
});
