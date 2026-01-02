// client/src/components/TaskChart.jsx
import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

const TaskChart = () => {
  const { tasks } = useContext(TaskContext);

  // 1. Calculate Stats
  const totalTasks = tasks.length;
  const completed = tasks.filter(task => task.status === 'Completed').length;
  const inProgress = tasks.filter(task => task.status === 'In Progress').length;
  const pending = tasks.filter(task => task.status === 'Pending').length;

  // 2. Handle Empty State (Zero Tasks)
  if (totalTasks === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 h-64 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
        <p className="text-slate-400 font-medium">No tasks yet</p>
        <p className="text-xs text-slate-400 mt-1">Add a task to see stats</p>
      </div>
    );
  }

  // 3. Calculate Degrees for Chart
  const completedDeg = (completed / totalTasks) * 360;
  const inProgressDeg = (inProgress / totalTasks) * 360;
  // Pending takes the remaining space automatically

  return (
    <div className="flex flex-col items-center">
      
      {/* CHART CIRCLE CONTAINER */}
      <div className="relative w-48 h-48 mb-6">
        
        {/* The Conic Gradient Circle (Donut) */}
        <div 
          className="w-full h-full rounded-full shadow-lg transition-all duration-1000 ease-out"
          style={{
            background: `conic-gradient(
              #10B981 0deg ${completedDeg}deg, 
              #3B82F6 ${completedDeg}deg ${completedDeg + inProgressDeg}deg, 
              #F59E0B ${completedDeg + inProgressDeg}deg 360deg
            )`
          }}
        ></div>

        {/* The White Center Circle (Hole) */}
        <div className="absolute inset-4 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
           {/* TEXT CENTERED PERFECTLY HERE */}
           <span className="text-4xl font-extrabold text-slate-800 animate-pulse">{totalTasks}</span>
           <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Total Tasks</span>
        </div>

      </div>

      {/* LEGEND (Bottom Labels) */}
      <div className="grid grid-cols-3 gap-2 w-full text-center">
        
        <div className="flex flex-col items-center p-2 bg-emerald-50 rounded-xl border border-emerald-100">
          <span className="w-3 h-3 bg-emerald-500 rounded-full mb-1"></span>
          <span className="text-lg font-bold text-emerald-700">{completed}</span>
          <span className="text-[10px] font-bold text-emerald-600 uppercase">Done</span>
        </div>

        <div className="flex flex-col items-center p-2 bg-blue-50 rounded-xl border border-blue-100">
          <span className="w-3 h-3 bg-blue-500 rounded-full mb-1"></span>
          <span className="text-lg font-bold text-blue-700">{inProgress}</span>
          <span className="text-[10px] font-bold text-blue-600 uppercase">Active</span>
        </div>

        <div className="flex flex-col items-center p-2 bg-amber-50 rounded-xl border border-amber-100">
          <span className="w-3 h-3 bg-amber-500 rounded-full mb-1"></span>
          <span className="text-lg font-bold text-amber-700">{pending}</span>
          <span className="text-[10px] font-bold text-amber-600 uppercase">Todo</span>
        </div>

      </div>
    </div>
  );
};

export default TaskChart;