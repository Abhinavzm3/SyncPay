import { addExpense, addMember, getTrip } from '../services/tripStore.js';

export const fetchCurrentTrip = async (_req, res, next) => {
  try {
    res.json(await getTrip());
  } catch (error) {
    next(error);
  }
};

export const createMember = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name?.trim()) {
      return res.status(400).json({ message: 'Member name is required' });
    }

    return res.status(201).json(await addMember({ name: name.trim() }));
  } catch (error) {
    return next(error);
  }
};

export const createExpense = async (req, res, next) => {
  try {
    const { title, amount, paidBy, participants, category, note, paidAt } = req.body;

    if (!title?.trim() || !amount || !paidBy || !Array.isArray(participants) || participants.length === 0) {
      return res.status(400).json({ message: 'Invalid expense payload' });
    }

    return res.status(201).json(
      await addExpense({
        title: title.trim(),
        amount: Number(amount),
        paidBy,
        participants,
        category,
        note,
        paidAt,
      }),
    );
  } catch (error) {
    return next(error);
  }
};
