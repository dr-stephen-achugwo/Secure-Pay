import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [accountInfo, setAccountInfo] = useState({ accountNumber: '', balance: 0 });
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [error, setError] = useState('');
  const [transactionType, setTransactionType] = useState('deposit'); // Track selected transaction type
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };

        const accountResponse = await axios.get(`${backendUrl}/api/account/info`, config);
        setAccountInfo(accountResponse.data);

        const transactionsResponse = await axios.get(`${backendUrl}/api/account/transactions`, config);
        setTransactions(transactionsResponse.data);
      } catch (error) {
        setError('Failed to fetch data');
      }
    };

    fetchData();
  }, [navigate]);

  const handleTransaction = async (type) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      let response;
      if (type === 'deposit' || type === 'withdraw') {
        response = await axios.post(`${backendUrl}/api/account/${type}`, { amount }, config);
      } else if (type === 'transfer') {
        response = await axios.post(`${backendUrl}/api/account/transfer`, { toAccount, amount }, config);
      }

      setAccountInfo({ ...accountInfo, balance: response.data.balance });
      setAmount('');
      setToAccount('');
      setError('');
    } catch (error) {
      setError(error.response?.data?.message || 'Transaction failed');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 p-6 font-sans pt-23"
    >
      <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-center font-mono">
        Dashboard
      </h1>

      {/* Account Info */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-xl shadow-2xl mb-6 transform transition-all duration-300 hover:shadow-neon"
      >
        <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Account Info
        </h2>
        <p className="text-gray-300">
            <strong className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">
                Account Number:
            </strong>{' '}
            <span className="text-yellow-400 font-bold glow-text">{accountInfo.accountNumber}</span>
        </p>
        <p className="text-gray-300 mt-2">
            <strong className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">
                Balance:
            </strong>{' '}
            <span className="text-yellow-400 font-bold glow-text">${accountInfo.balance}</span>
        </p>
      </motion.div>

      {/* Transfer Options */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-xl shadow-2xl mb-6 transform transition-all duration-300 hover:shadow-neon"
      >
        <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Transfer Options
        </h2>
        <div className="space-y-4">
          {/* Transaction Type Selector */}
          <div className="flex space-x-4">
            <button
              onClick={() => setTransactionType('deposit')}
              className={`flex-1 p-3 rounded-xl transition-all duration-300 ${
                transactionType === 'deposit'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md hover:shadow-neon'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Deposit
            </button>
            <button
              onClick={() => setTransactionType('withdraw')}
              className={`flex-1 p-3 rounded-xl transition-all duration-300 ${
                transactionType === 'withdraw'
                  ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-md hover:shadow-neon'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Withdraw
            </button>
            <button
              onClick={() => setTransactionType('transfer')}
              className={`flex-1 p-3 rounded-xl transition-all duration-300 ${
                transactionType === 'transfer'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:shadow-neon'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Transfer
            </button>
          </div>

          {/* Amount Field */}
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 bg-gray-700 text-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
          />

          {/* To Account Field (Only for Transfer) */}
          {transactionType === 'transfer' && (
            <input
              type="text"
              placeholder="To Account"
              value={toAccount}
              onChange={(e) => setToAccount(e.target.value)}
              className="w-full p-3 bg-gray-700 text-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTransaction(transactionType)}
            className={`w-full p-3 text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-neon ${
              transactionType === 'deposit'
                ? 'bg-gradient-to-r from-green-500 to-green-600'
                : transactionType === 'withdraw'
                ? 'bg-gradient-to-r from-yellow-500 to-yellow-600'
                : 'bg-gradient-to-r from-blue-500 to-blue-600'
            }`}
          >
            {transactionType === 'deposit'
              ? 'Deposit'
              : transactionType === 'withdraw'
              ? 'Withdraw'
              : 'Transfer'}
          </motion.button>
        </div>
        {error && <p className="text-red-400 mt-4">{error}</p>}
      </motion.div>

      {/* Transaction History */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-xl shadow-2xl transform transition-all duration-300 hover:shadow-neon"
      >
        <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Transaction History
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-700 rounded-xl">
            <thead>
              <tr className="bg-gray-800">
                <th className="py-3 px-6 text-left text-gray-300 font-semibold">Type</th>
                <th className="py-3 px-6 text-left text-gray-300 font-semibold">Amount</th>
                <th className="py-3 px-6 text-left text-gray-300 font-semibold">Description</th>
                <th className="py-3 px-6 text-left text-gray-300 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <motion.tr
                  key={transaction._id}
                  whileHover={{ scale: 1.01 }}
                  className="border-b border-gray-600 hover:bg-gray-600 transition-all duration-300"
                >
                  <td className="py-4 px-6 text-gray-300">{transaction.type}</td>
                  <td className="py-4 px-6 text-gray-300">${transaction.amount}</td>
                  <td className="py-4 px-6 text-gray-300">{transaction.description}</td>
                  <td className="py-4 px-6 text-gray-300">
                    {new Date(transaction.createdAt).toLocaleString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;