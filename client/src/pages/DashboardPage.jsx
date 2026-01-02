// client/src/pages/DashboardPage.jsx
import { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TaskContext } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import TaskChart from '../components/TaskChart';
import { LayoutDashboard, LogOut, UserCircle, CheckCircle, Clock, ListTodo, TrendingUp } from 'lucide-react'; // New Icons added

const DashboardPage = () => {
  const { user, logout } = useContext(AuthContext);
  const { tasks, fetchTasks } = useContext(TaskContext); // 'tasks' eduthu stats-ku anuppurom
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) { navigate('/'); } else { fetchTasks(); }
  }, [user, navigate, fetchTasks]);

  // STATS CALCULATION 📊
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const pendingTasks = tasks.filter(t => t.status !== 'Completed').length;

  // DATE FORMAT 📅
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* 1. NAVBAR */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm/50 backdrop-blur-md bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-200 transform hover:rotate-6 transition-all duration-300">
                <LayoutDashboard className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                Medify<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Task</span>
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-3 text-right">
                <div>
                   <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Welcome back</p>
                   <p className="text-slate-800 font-bold text-base">{user?.name}</p>
                </div>
                <div className="bg-slate-100 p-1.5 rounded-full border border-slate-200">
                   <UserCircle className="text-slate-600" size={28} />
                </div>
              </div>
              <button onClick={logout} className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2.5 rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300 font-bold text-sm border border-red-100 shadow-sm active:scale-95">
                <LogOut size={18} /> <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* 2. WELCOME BANNER (NEW ✨) */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-8 mb-10 text-white shadow-xl shadow-blue-200 relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Hello, {user?.name}! 👋</h2>
            <p className="text-blue-100 text-lg font-medium opacity-90">Today is {today}. You have <span className="font-bold text-white bg-white/20 px-2 py-0.5 rounded-lg">{pendingTasks} pending tasks</span> to finish!</p>
          </div>
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
        </div>

        {/* 3. QUICK STATS CARDS (NEW 📊) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
           {/* Total Tasks Card */}
           <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-5">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl">
                 <ListTodo size={32} />
              </div>
              <div>
                 <p className="text-slate-500 font-medium text-sm">Total Tasks</p>
                 <h3 className="text-3xl font-bold text-slate-800">{totalTasks}</h3>
              </div>
           </div>
           
           {/* Pending Tasks Card */}
           <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-5">
              <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl">
                 <Clock size={32} />
              </div>
              <div>
                 <p className="text-slate-500 font-medium text-sm">Pending</p>
                 <h3 className="text-3xl font-bold text-slate-800">{pendingTasks}</h3>
              </div>
           </div>

           {/* Completed Tasks Card */}
           <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-5">
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
                 <CheckCircle size={32} />
              </div>
              <div>
                 <p className="text-slate-500 font-medium text-sm">Completed</p>
                 <h3 className="text-3xl font-bold text-slate-800">{completedTasks}</h3>
              </div>
           </div>
        </div>

        {/* 4. MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-8">
             {/* Chart Card */}
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-28">
               <div className="flex items-center gap-2 mb-6">
                 <TrendingUp className="text-blue-600" size={20}/>
                 <h3 className="font-bold text-lg text-slate-800">Analytics</h3>
               </div>
               <TaskChart />
             </div>
          </div>
          
          <div className="lg:col-span-2">
             <TaskList />
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;