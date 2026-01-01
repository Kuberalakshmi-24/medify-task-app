// server/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./db'); // Import DB Connection

// Import Models
const User = require('./models/User');
const Task = require('./models/Task');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Define Relationships
User.hasMany(Task, { foreignKey: 'userId' });
Task.belongsTo(User, { foreignKey: 'userId' });

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully!');

    // Sync Database
    await sequelize.sync({ force: true }); 
    console.log('✅ All Tables Synced Successfully!');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server Error:', error);
  }
};

startServer();