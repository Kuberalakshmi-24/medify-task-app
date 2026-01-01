// client/src/components/TaskChart.jsx
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useTasks } from '../context/TaskContext';
import { PieChart } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskChart = () => {
  const { tasks } = useTasks();
  const pending = tasks.filter(t => t.status === 'Pending').length;
  const inProgress = tasks.filter(t => t.status === 'In Progress').length;
  const completed = tasks.filter(t => t.status === 'Completed').length;

  const data = {
    labels: ['Pending', 'In Progress', 'Completed'],
    datasets: [{
      label: '# of Tasks', data: [pending, inProgress, completed],
      backgroundColor: ['#F59E0B', '#3B82F6', '#10B981'],
      borderColor: ['#ffffff', '#ffffff', '#ffffff'], borderWidth: 3, hoverOffset: 10
    }],
  };

  if (tasks.length === 0) return <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 h-full flex items-center justify-center text-slate-500">No task data yet.</div>;

  return (
    <div className="p-6 mb-6 bg-white rounded-2xl shadow-sm border border-slate-100 h-full flex flex-col items-center transition-all hover:shadow-xl">
      <h3 className="mb-6 text-xl font-extrabold text-slate-800 flex items-center gap-2">
        <PieChart className="text-blue-600"/> Task Statistics
      </h3>
      <div className="w-72 h-72 relative">
        <Doughnut data={data} options={{ cutout: '65%', plugins: { legend: { position: 'bottom', labels: { padding: 20, font: { family: 'Inter', size: 12 } } } } }} />
        <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
           <span className="text-4xl font-extrabold text-slate-800">{tasks.length}</span>
           <span className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Total Tasks</span>
        </div>
      </div>
    </div>
  );
};

export default TaskChart;