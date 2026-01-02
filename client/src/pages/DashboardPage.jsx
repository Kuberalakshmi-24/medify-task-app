import { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TaskContext } from '../context/TaskContext'; // TaskContext irukkanum
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList'; // Unga component path check pannunga
import TaskChart from '../components/TaskChart'; // Unga component path check pannunga

const DashboardPage = () => {
  const { user, logout } = useContext(AuthContext); // Use Context (Safe way)
  const { fetchTasks } = useContext(TaskContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/'); // User illana Login page-ku po
    } else {
      fetchTasks(); // User iruntha tasks edu
    }
  }, [user, navigate, fetchTasks]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">MedifyTask</h1>
        <div className="flex items-center gap-4">
          <span className="text-slate-600 font-medium">Welcome, {user?.name}</span>
          <button 
            onClick={logout}
            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors text-sm font-bold"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Chart Section */}
          <div className="md:col-span-1">
             <TaskChart />
          </div>
          
          {/* List Section */}
          <div className="md:col-span-2">
             <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;