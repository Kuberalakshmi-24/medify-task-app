// client/src/pages/DashboardPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import TaskList from '../components/TaskList';
import TaskChart from '../components/TaskChart';
import { LogOut, LayoutDashboard } from 'lucide-react'; // Added Icons

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { fetchTasks } = useTasks();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (!token) { navigate('/'); } else {
      setUser(JSON.parse(userData));
      fetchTasks();
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* MODERN NAVBAR WITH GRADIENT */}
      <nav className="bg-gradient-to-r from-blue-700 to-indigo-800 shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center text-white">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <LayoutDashboard size={28} /> MedifyTask
          </h1>
          <div className="flex items-center gap-6">
            <span className="font-medium opacity-90 hidden md:block">Welcome, {user?.name}</span>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all text-sm font-semibold backdrop-blur-sm">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-8">Dashboard Overview</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {/* Chart Section with Hover Effect */}
          <div className="md:col-span-1 transition-transform hover:scale-[1.02]">
            <TaskChart />
          </div>
          <div className="md:col-span-2">
            <TaskList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;