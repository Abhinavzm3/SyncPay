import { addExpense, addMember, getTrip } from '../services/tripStore.js';

export const fetchCurrentTrip = (_req, res) => {
  res.json(getTrip());
};

export const createMember = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Member name required' });
  return res.status(201).json(addMember({ name }));
};

export const createExpense = (req, res) => {
  const { title, amount, paidBy, participants } = req.body;
  if (!title || !amount || !paidBy || !Array.isArray(participants) || participants.length === 0) {
    return res.status(400).json({ message: 'Invalid expense payload' });
  }
  return res.status(201).json(addExpense({ title, amount, paidBy, participants }));
};
