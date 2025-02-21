import mongoose from 'mongoose';

export const connect = async () => {
  const dbUrl = process.env.NODE_ENV === 'test' 
    ? process.env.TEST_MONGODB_URL 
    : process.env.MONGODB_URL;
    
  await mongoose.connect(dbUrl || 'mongodb://localhost:27017/test');
};

export const disconnect = async () => {
  await mongoose.connection.close();
};