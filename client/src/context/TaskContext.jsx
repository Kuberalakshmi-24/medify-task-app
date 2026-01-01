// client/src/context/TaskContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const { data } = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks", error);
      setLoading(false);
    }
  };

  // Add Task
  const addTask = async (taskData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/tasks', taskData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Task Added!');
      fetchTasks(); // Refresh State
    } catch (error) {
      toast.error('Failed to add task');
    }
  };

  // Update Task
  const updateTask = async (id, updatedData) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Task Updated!');
      fetchTasks();
    } catch (error) {
      toast.error('Update Failed');
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    if(!window.confirm("Are you sure?")) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Task Deleted');
      fetchTasks();
    } catch (error) {
      toast.error('Delete Failed');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, loading, fetchTasks, addTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};