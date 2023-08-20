import mongoose from 'mongoose';

export async function connect() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    connection.on('error', (err) => {
      console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
      process.exit(1); // Exit with a non-zero code to indicate an error
    });

  } catch (error) {
    console.log('Something went wrong!');
    console.error(error);
    process.exit(1); // Exit with a non-zero code to indicate an error
  }
}
