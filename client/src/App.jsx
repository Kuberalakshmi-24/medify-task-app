// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage'; // Idhu irukka?
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} /> {/* Idhu romba mukkiyam */}
      </Routes>
    </Router>
  );
}

export default App;