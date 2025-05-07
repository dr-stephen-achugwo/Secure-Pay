// backend/routes/account.js
import express from 'express';
import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

// Get Account Info
router.get('/info', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      accountNumber: user.accountNumber,
      balance: user.balance,
    });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Deposit Money
router.post('/deposit', auth, async (req, res) => {
  const { amount } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.balance += amount;
    await user.save();

    // Record transaction
    const transaction = new Transaction({
      senderAccount: user.accountNumber,
      receiverAccount: user.accountNumber,
      type: 'deposit',
      amount,
      description: `Deposit to self`,
    });
    await transaction.save();

    res.status(200).json({ message: 'Deposit successful', balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Withdraw Money
router.post('/withdraw', auth, async (req, res) => {
  const { amount } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    user.balance -= amount;
    await user.save();

    // Record transaction
    const transaction = new Transaction({
      senderAccount: user.accountNumber,
      receiverAccount: user.accountNumber,
      type: 'withdraw',
      amount,
      description: `Withdraw from self`,
    });
    await transaction.save();

    res.status(200).json({ message: 'Withdrawal successful', balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Transfer Money
router.post('/transfer', auth, async (req, res) => {
  const { toAccount, amount } = req.body;

  try {
    const fromUser = await User.findById(req.userId);
    const toUser = await User.findOne({ accountNumber: toAccount });

    if (!fromUser || !toUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (fromUser.accountNumber === toUser.accountNumber) {
      return res.status(400).json({ message: 'Cannot transfer to yourself' });
    }

    if (fromUser.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Update balances
    fromUser.balance = Number(fromUser.balance) - Number(amount);
    toUser.balance = Number(toUser.balance) + Number(amount);

    await fromUser.save();
    await toUser.save();

    // Record transactions
    const fromTransaction = new Transaction({
      senderAccount: fromUser.accountNumber,
      receiverAccount: toUser.accountNumber,
      type: 'transfer',
      amount,
      description: `Transfer to account ${toUser.accountNumber}`,
    });
    await fromTransaction.save();

    const toTransaction = new Transaction({
      senderAccount: fromUser.accountNumber,
      receiverAccount: toUser.accountNumber,
      type: 'transfer',
      amount,
      description: `Transfer from account ${fromUser.accountNumber}`,
    });
    await toTransaction.save();

    res.status(200).json({ message: 'Transfer successful', balance: fromUser.balance });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Get Transaction History
// Backend/routes/account.js
router.get('/transactions', auth, async (req, res) => {
  try {
    // Find the logged-in user
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find all transactions where the user's account number is either sender or receiver
    const transactions = await Transaction.find({
      $or: [
        { senderAccount: user.accountNumber },
        { receiverAccount: user.accountNumber },
      ],
    }).sort({ createdAt: -1 }); // Sort by most recent first

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

export default router;