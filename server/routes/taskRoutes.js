// server/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');

// 1. GET ALL TASKS
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.findAll({ 
      where: { userId: req.user.id },
      order: [['dueDate', 'ASC']] // Order by date (Seekiram mudikka vendiyathu first varum)
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// 2. CREATE TASK
router.post('/', authMiddleware, async (req, res) => {
  try {
    // We now accept priority and dueDate
    const { title, description, status, priority, dueDate } = req.body;
    
    const newTask = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      userId: req.user.id
    });
    res.status(201).json(newTask);
  } catch (error) {
    console.error("❌ CREATE ERROR:", error);
    res.status(500).json({ message: "Creation Failed" });
  }
});

// 3. UPDATE TASK
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.update(req.body);
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// 4. DELETE TASK
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.destroy();
    res.json({ message: "Task Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;