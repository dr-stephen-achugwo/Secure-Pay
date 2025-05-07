import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/auth/signup`, { name, email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      alert('Error creating account');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800"
    >
      <motion.form
        whileHover={{ scale: 1.02 }}
        onSubmit={handleSubmit}
        className="bg-gradient-to-r from-gray-800 to-gray-700 p-8 rounded-xl shadow-2xl w-96 transform transition-all duration-300 hover:shadow-neon"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Sign Up
        </h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          required
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-md hover:shadow-neon transition-all duration-300"
        >
          Sign Up
        </motion.button>
        <p className="mt-4 text-center text-gray-300">
          Already have an account?{' '}
          <a href="/" className="text-blue-400 hover:text-blue-500 transition-all duration-300">
            Sign In
          </a>
        </p>
      </motion.form>
    </motion.div>
  );
};

export default SignUp;