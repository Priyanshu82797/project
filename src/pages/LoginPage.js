import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Demo credentials
  const fillDemoCredentials = () => {
    setFormData({
      email: 'demo@example.com',
      password: 'demo123456',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🌉</div>
          <h1 className="text-3xl font-bold text-white">Smart Bridge</h1>
          <p className="text-blue-300">Digital Twin Platform</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-800 bg-opacity-50 backdrop-blur-sm border border-blue-500 border-opacity-30 rounded-lg p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>

          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-700 border border-blue-500 border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-700 border border-blue-500 border-opacity-30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Demo Button */}
          <div className="mt-4 pt-4 border-t border-blue-500 border-opacity-30">
            <button
              onClick={fillDemoCredentials}
              className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-blue-300 font-medium rounded-lg transition border border-blue-500 border-opacity-30"
            >
              Use Demo Credentials
            </button>
            <p className="text-xs text-gray-400 text-center mt-2">Email: demo@example.com | Password: demo123456</p>
          </div>

          {/* Register Link */}
          <p className="text-center text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">
              Register
            </Link>
          </p>

          {/* Home Link */}
          <p className="text-center text-gray-400 mt-4">
            <Link to="/" className="text-gray-500 hover:text-gray-400 text-sm">
              Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
