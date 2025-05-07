// Backend/models/Transaction.js
import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema({
  senderAccount: { type: String, required: true }, // Account number of the sender
  receiverAccount: { type: String, required: true }, // Account number of the receiver
  type: { type: String, enum: ['deposit', 'withdraw', 'transfer'], required: true },
  amount: { type: Number, required: true },
  description: { type: String, required: true }, // Human-readable description
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Transaction', transactionSchema);