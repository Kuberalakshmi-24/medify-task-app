// client/src/context/TaskContext.jsx
import { createContext, useState, useContext } from 'react';
import axios from 'axios';

// 1. Create Context
export const TaskContext = createContext();

// 2. Custom Hook
export const useTasks = () => useContext(TaskContext);

// 3. Provider Component
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  
  // Render Live URL
  const API_URL = 'https://medify-api.onrender.com/api/tasks'; 

  // Helper to get Token
  const getToken = () => localStorage.getItem('token');

  const fetchTasks = async () => {
    const token = getToken();
    if (!token) return;
    try {
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // FIX: Accepting 'taskData' object (Title, Desc, Priority, Date)
  const addTask = async (taskData) => {
    const token = getToken();
    try {
      const res = await axios.post(API_URL, taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks([...tasks, res.data]); // Update UI instantly
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // MISSING FUNCTION ADDED: Update Task
  const updateTask = async (id, updatedData) => {
    const token = getToken();
    try {
      const res = await axios.put(`${API_URL}/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    const token = getToken();
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Handle both '_id' (MongoDB) and 'id' (Frontend) mismatch
      setTasks(tasks.filter((task) => (task._id || task.id) !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};