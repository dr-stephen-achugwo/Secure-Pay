import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 p-6 pt-25"
    >
      <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-center">
        About
      </h1>

      {/* Site Functions */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-xl shadow-2xl mb-6 transform transition-all duration-300 hover:shadow-neon"
      >
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          What This Site Does
        </h2>
        <p className="text-gray-300 mb-4">
          This is a **Payment Gateway App** built with the **MERN stack** (MongoDB, Express.js, React, Node.js). It allows users to:
        </p>
        <ul className="list-disc list-inside text-gray-300">
          <li>Create an account and log in securely.</li>
          <li>View their account details, including balance and account number.</li>
          <li>Perform transactions such as deposits, withdrawals, and transfers.</li>
          <li>View a detailed history of all transactions.</li>
        </ul>
      </motion.div>

      {/* How It Was Created */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-xl shadow-2xl mb-6 transform transition-all duration-300 hover:shadow-neon"
      >
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          How It Was Created
        </h2>
        <p className="text-gray-300 mb-4">
          This app was built using the following technologies and tools:
        </p>
        <ul className="list-disc list-inside text-gray-300">
          <li>
            <strong>Frontend:</strong> React.js with TailwindCSS for styling and Framer Motion for animations.
          </li>
          <li>
            <strong>Backend:</strong> Node.js and Express.js for the server, with MongoDB as the database.
          </li>
          <li>
            <strong>Authentication:</strong> JSON Web Tokens (JWT) for secure user authentication.
          </li>
          <li>
            <strong>API Testing:</strong> Postman for testing backend endpoints.
          </li>
          <li>
            <strong>Version Control:</strong> Git and GitHub for version control and collaboration.
          </li>
        </ul>
      </motion.div>

      {/* Contact Info */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-xl shadow-2xl transform transition-all duration-300 hover:shadow-neon"
      >
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Contact Me
        </h2>
        <p className="text-gray-300 mb-4">
          If you have any questions, feedback, or would like to collaborate, feel free to reach out to me:
        </p>
        <ul className="list-disc list-inside text-gray-300">
          <li>
            <strong>Email:</strong> nksnamannks@gmail.com
          </li>
          <li>
            <strong>GitHub:</strong>{' '}
            <a
              href="https://github.com/NKSG100"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500 transition-all duration-300"
            >
              Visit Github Profile
            </a>
          </li>
          <li>
            <strong>LinkedIn:</strong>{' '}
            <a
              href="https://www.linkedin.com/in/naman-kumar-singh-36121a1b5/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500 transition-all duration-300"
            >
              Visit LinkedIn Profile
            </a>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default About;