import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import doctorImg from '../assets/branch4.jpg';
import { loginUser } from '../services/api';
import api from '../services/api';

export function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await loginUser(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Đăng nhập thất bại');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Sign in</h2>
          <p className="text-gray-500 mb-6">Enter your account details to enter our platform.</p>

          {error && <p className="text-red-600 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="********"
                required
              />
            </div>

            <div className="flex justify-end">
              <Link to="/forgot" className="text-sm text-indigo-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Right image */}
      <div className="hidden lg:block w-1/2 relative">
        <img
          src={doctorImg}
          alt="Doctor"
          className="absolute inset-0 w-full h-full object-cover rounded-l-3xl"
        />
        <div className="absolute bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-2xl max-w-xs">
          <p className="text-sm">
            A foundation GPT model built from the ground up on medical events
            specifically for all the encoded data in healthcare.
          </p>
        </div>
      </div>
    </div>
  );
}