// client/src/components/TaskList.jsx
import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { Trash2, CheckCircle, Circle, Clock, Calendar, Flag, Edit2, X, Filter, PlusCircle } from 'lucide-react';

const TaskList = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  // Default new task is Pending
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'Pending', priority: 'Medium', dueDate: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) { 
      await updateTask(editId, newTask); 
      setIsEditing(false); 
      setEditId(null); 
    } else { 
      // Ensure new tasks start as Pending
      await addTask({ ...newTask, status: 'Pending' }); 
    }
    setNewTask({ title: '', description: '', status: 'Pending', priority: 'Medium', dueDate: '' });
  };

  const startEdit = (task) => {
    setNewTask({ title: task.title, description: task.description, status: task.status, priority: task.priority, dueDate: task.dueDate || '' });
    setIsEditing(true); 
    setEditId(task.id || task._id); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => { 
    setIsEditing(false); 
    setEditId(null); 
    setNewTask({ title: '', description: '', status: 'Pending', priority: 'Medium', dueDate: '' }); 
  };

  // NEW: 3-WAY TOGGLE (Pending -> In Progress -> Completed -> Pending)
  const handleStatusToggle = (task) => { 
    let newStatus;
    if (task.status === 'Pending') newStatus = 'In Progress';
    else if (task.status === 'In Progress') newStatus = 'Completed';
    else newStatus = 'Pending';
    
    updateTask(task.id || task._id, { status: newStatus }); 
  };

  const getPriorityColor = (p) => { 
    if (p === 'High') return 'text-red-700 bg-red-50 border-red-100'; 
    if (p === 'Medium') return 'text-amber-700 bg-amber-50 border-amber-100'; 
    return 'text-blue-700 bg-blue-50 border-blue-100'; 
  };

  // NEW: Status Colors
  const getStatusColor = (s) => {
    if (s === 'Completed') return 'bg-green-100 text-green-800 border-green-200';
    if (s === 'In Progress') return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-slate-100 text-slate-800 border-slate-200';
  };

  const filteredTasks = tasks.filter(task => {
    const statusMatch = filterStatus === 'All' || task.status === filterStatus;
    const priorityMatch = filterPriority === 'All' || task.priority === filterPriority;
    return statusMatch && priorityMatch;
  });

  const inputClass = "p-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none text-slate-700 bg-slate-50 focus:bg-white";

  return (
    <div>
      {/* FILTER SECTION */}
      <div className="flex flex-wrap items-center gap-4 mb-8 p-5 bg-white rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-2 text-slate-700 font-bold text-lg"><Filter size={22} className="text-blue-600"/> Filters:</div>
        <select className={`${inputClass} py-2`} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All Status</option><option value="Pending">Pending</option><option value="In Progress">In Progress</option><option value="Completed">Completed</option>
        </select>
        <select className={`${inputClass} py-2`} value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
          <option value="All">All Priorities</option><option value="High">High</option><option value="Medium">Medium</option><option value="Low">Low</option>
        </select>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className={`p-6 mb-8 rounded-2xl shadow-lg transition-all ${isEditing ? 'bg-indigo-50 border-2 border-indigo-200 shadow-indigo-100' : 'bg-white border border-slate-100'}`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className={`text-xl font-extrabold flex items-center gap-2 ${isEditing ? 'text-indigo-800' : 'text-slate-800'}`}>
            {isEditing ? <><Edit2 size={24}/> Edit Task</> : <><PlusCircle size={24} className="text-blue-600"/> Add New Task</>}
          </h3>
          {isEditing && <button type="button" onClick={cancelEdit} className="text-slate-500 hover:text-slate-700 hover:bg-slate-200 p-2 rounded-full transition-all"><X size={20}/></button>}
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
          <input type="text" placeholder="Task Title..." required className={inputClass} value={newTask.title} onChange={(e) => setNewTask({...newTask, title: e.target.value})}/>
          <input type="text" placeholder="Description..." className={inputClass} value={newTask.description} onChange={(e) => setNewTask({...newTask, description: e.target.value})}/>
          
          {/* Status Dropdown visible ONLY during Edit */}
          {isEditing ? (
             <select className={inputClass} value={newTask.status} onChange={(e) => setNewTask({...newTask, status: e.target.value})}>
               <option value="Pending">Pending</option><option value="In Progress">In Progress</option><option value="Completed">Completed</option>
             </select>
          ) : (
             <select className={inputClass} value={newTask.priority} onChange={(e) => setNewTask({...newTask, priority: e.target.value})}>
               <option value="Low">Low</option><option value="Medium">Medium</option><option value="High">High</option>
             </select>
          )}

          <input type="date" className={inputClass} value={newTask.dueDate} onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}/>
          <button type="submit" className={`px-6 py-3 text-white rounded-xl font-bold shadow-md transition-all transform hover:-translate-y-1 flex justify-center items-center gap-2 ${isEditing ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'}`}>
            {isEditing ? 'Update' : <>Add Task</>}
          </button>
        </div>
      </form>

      {/* TASK LIST */}
      <div className="grid gap-5 md:grid-cols-2">
        {filteredTasks.map((task) => (
          <div key={task._id || task.id} className={`group relative p-5 rounded-2xl bg-white shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${task.status === 'Completed' ? 'border-l-8 border-l-green-500 opacity-80' : task.status === 'In Progress' ? 'border-l-8 border-l-blue-500' : 'border-l-8 border-l-amber-500'}`}>
            
            <div className="flex justify-between items-start">
              <div>
                <h4 className={`text-lg font-bold ${task.status === 'Completed' ? 'text-slate-500 line-through' : 'text-slate-800'}`}>{task.title}</h4>
                <p className="mb-3 text-slate-500 text-sm">{task.description}</p>
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => startEdit(task)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"><Edit2 size={18}/></button>
                <button onClick={() => deleteTask(task._id || task.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"><Trash2 size={18}/></button>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4 text-sm mt-2">
              <span className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 font-semibold border ${getPriorityColor(task.priority)}`}><Flag size={14}/> {task.priority}</span>
              {task.dueDate && <span className="flex items-center gap-1.5 text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full"><Calendar size={14}/> {task.dueDate}</span>}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-2">
              <span className={`px-3 py-1 text-xs rounded-full font-bold border ${getStatusColor(task.status)}`}>
                {task.status}
              </span>
              
              {/* STATUS TOGGLE BUTTON */}
              <button onClick={() => handleStatusToggle(task)} className="text-slate-300 hover:text-blue-600 transition-all transform hover:scale-110" title="Click to change status">
                {task.status === 'Completed' ? <CheckCircle className="text-green-500 drop-shadow-sm" size={28}/> : 
                 task.status === 'In Progress' ? <Clock className="text-blue-500 drop-shadow-sm" size={28}/> : 
                 <Circle size={28}/>}
              </button>
            </div>

          </div>
        ))}
      </div>
      {filteredTasks.length === 0 && <div className="text-center p-10 bg-white rounded-2xl shadow-sm border border-slate-100"><p className="text-slate-500 font-medium">No tasks found matching your filters.</p></div>}
    </div>
  );
};

export default TaskList;