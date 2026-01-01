// server/models/Task.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM('Pending', 'In Progress', 'Completed'), 
    defaultValue: 'Pending',
  },
  // NEW: Priority Level
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    defaultValue: 'Medium',
  },
  // NEW: Due Date
  dueDate: {
    type: DataTypes.DATEONLY, // Stores only date (YYYY-MM-DD)
    allowNull: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  }
});

module.exports = Task;