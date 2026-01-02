import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Icons import pannurom

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggle

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid Credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg border border-slate-100">
        <h2 className="text-3xl font-extrabold text-center text-slate-800 mb-8">Login to MedifyTask</h2>
        {error && <p className="mb-4 text-center text-red-500 bg-red-50 p-2 rounded-lg text-sm font-medium">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-bold text-slate-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-slate-700">Password</label>
            <div className="relative"> {/* Relative container for icon positioning */}
              <input
                type={showPassword ? "text" : "password"} // Type maarum
                name="password"
                placeholder="Enter your password"
                className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all pr-10"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-3 font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-slate-600 text-sm">
          Don't have an account? <Link to="/register" className="text-blue-600 font-bold hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;