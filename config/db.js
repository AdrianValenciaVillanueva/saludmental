const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://adrianvalencia5250:Adrian2004.@test.cnasm.mongodb.net/SaludMental?retryWrites=true&w=majority&appName=test', {
    });
    console.log('MongoDB is connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Salir del proceso con error
  }
};

module.exports = connectDB;