// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // Import Toaster
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <TaskProvider>
          {/* Toast Setup */}
          <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
          
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;