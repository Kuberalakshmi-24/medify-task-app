// server/config/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Database connection setup
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Console-la niraiya SQL commands varaama irukka
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Supabase ku ithu kandippa thevai
    }
  }
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully!');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

module.exports = { sequelize, connectDB };