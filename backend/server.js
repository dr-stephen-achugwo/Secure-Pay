// backend/server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import accountRoutes from './routes/account.js';
import limiter from './middlewares/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors(
  {
    origin: process.env.FRONTEND_URI,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true 
  }
));
app.use(express.json());
app.use(limiter);

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});