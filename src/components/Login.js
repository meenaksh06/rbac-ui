import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setCurrentView } = useAppContext();

  const handleLogin = (e) => {
    e.preventDefault();
    if (userId === 'admin@123' && email === 'admin@gmail.com' && password === '1234') {
      setCurrentView('dashboard');
    } else {
      alert('Invalid credentials!');
    }
  };

  const handleForgotPassword = () => {
    alert('Redirecting to the forgot password page...');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 md:p-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Welcome Back!</h1>
          <p className="text-gray-600 mt-2">Log in to access your dashboard</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
              User ID
            </label>
            <input
              type="text"
              id="userId"
              placeholder="Enter your User ID"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your Password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="text-right mb-6">
            <button
              type="button"
              className="text-sm text-blue-500 hover:underline"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>

        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <p className="text-sm text-gray-700">Mock Credentials:</p>
          <p className="text-sm text-gray-700">User ID: <strong>admin@123</strong></p>
          <p className="text-sm text-gray-700">Email: <strong>admin@gmail.com</strong></p>
          <p className="text-sm text-gray-700">Password: <strong>1234</strong></p>
        </div>
      </div>
    </div>
  );
};

export default Login;

