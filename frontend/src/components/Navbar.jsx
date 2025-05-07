import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-800 to-gray-900 p-4 shadow-2xl z-50"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 transition-all duration-300"
        >
          Payment Gateway
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          {token ? (
            <>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-white transition-all duration-300"
                >
                  Dashboard
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition-all duration-300"
                >
                  About
                </Link>
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="cursor-pointer bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded shadow-md hover:shadow-neon transition-all duration-300"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-all duration-300"
                >
                  Sign In
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/signup"
                  className="text-gray-300 hover:text-white transition-all duration-300"
                >
                  Sign Up
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition-all duration-300"
                >
                  About
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;