import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    avatarColor: { type: String, default: '#70a1ff' },
  },
  { _id: true },
);

const expenseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0.01 },
    category: {
      type: String,
      enum: ['food', 'stay', 'transport', 'activity', 'shopping', 'other'],
      default: 'other',
    },
    paidBy: { type: mongoose.Schema.Types.ObjectId, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, required: true }],
    note: { type: String, default: '' },
    paidAt: { type: Date, default: Date.now },
  },
  { _id: true },
);

const tripSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    currency: { type: String, default: 'INR' },
    members: [memberSchema],
    expenses: [expenseSchema],
  },
  { timestamps: true },
);

export const Trip = mongoose.model('Trip', tripSchema);
