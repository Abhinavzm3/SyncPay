import { Types } from 'mongoose';
import { isMongoConnected } from '../config/db.js';
import { Trip } from '../models/Trip.js';
import { buildSettlements, calculateBalances } from './settlementService.js';

const defaultTripMongo = {
  name: 'Goa Friends Getaway',
  currency: 'INR',
  members: [
    { name: 'Aarav', avatarColor: '#7f5af0' },
    { name: 'Siya', avatarColor: '#2cb67d' },
    { name: 'Kabir', avatarColor: '#ef4565' },
  ],
  expenses: [],
};

let memoryTrip = {
  _id: 'local-fallback-trip',
  name: 'Goa Friends Getaway',
  currency: 'INR',
  members: [
    { _id: 'm1', name: 'Aarav', avatarColor: '#7f5af0' },
    { _id: 'm2', name: 'Siya', avatarColor: '#2cb67d' },
    { _id: 'm3', name: 'Kabir', avatarColor: '#ef4565' },
  ],
  expenses: [],
};

const mapTripForClient = (tripDoc) => {
  const balances = calculateBalances(tripDoc);
  const members = tripDoc.members.map((member) => {
    const id = member._id.toString();
    return { id, name: member.name, avatarColor: member.avatarColor, net: Number((balances[id] ?? 0).toFixed(2)) };
  });

  const expenses = [...tripDoc.expenses]
    .sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt))
    .map((expense) => ({
      id: expense._id.toString(),
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      paidBy: expense.paidBy.toString(),
      participants: expense.participants.map((participant) => participant.toString()),
      paidAt: expense.paidAt,
      note: expense.note,
    }));

  return {
    id: tripDoc._id.toString(),
    name: tripDoc.name,
    currency: tripDoc.currency,
    members,
    expenses,
  };
};

const ensureTripMongo = async () => {
  let trip = await Trip.findOne();
  if (!trip) {
    trip = await Trip.create(defaultTripMongo);
  }
  return trip;
};

const ensureTrip = async () => (isMongoConnected() ? ensureTripMongo() : memoryTrip);

const buildResponse = (trip) => {
  const normalizedTrip = mapTripForClient(trip);
  const settlements = buildSettlements(trip).settlements;
  const totalSpent = normalizedTrip.expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return {
    trip: normalizedTrip,
    settlements,
    stats: {
      totalSpent: Number(totalSpent.toFixed(2)),
      expenseCount: normalizedTrip.expenses.length,
      memberCount: normalizedTrip.members.length,
    },
  };
};

export const getTrip = async () => buildResponse(await ensureTrip());

export const addMember = async ({ name }) => {
  const colors = ['#7f5af0', '#2cb67d', '#ef4565', '#3da9fc', '#ff8906', '#f25f4c'];
  const trip = await ensureTrip();
  const usedColors = trip.members.map((member) => member.avatarColor);
  const avatarColor = colors.find((color) => !usedColors.includes(color)) ?? '#70a1ff';

  if (isMongoConnected()) {
    trip.members.push({ name, avatarColor });
    await trip.save();
    return getTrip();
  }

  memoryTrip.members.push({ _id: `m-${Date.now()}`, name, avatarColor });
  return buildResponse(memoryTrip);
};

export const addExpense = async ({ title, amount, paidBy, participants, category, note, paidAt }) => {
  const trip = await ensureTrip();

  if (isMongoConnected()) {
    trip.expenses.push({
      _id: new Types.ObjectId(),
      title,
      amount,
      paidBy,
      participants,
      category: category || 'other',
      note: note || '',
      paidAt: paidAt || new Date(),
    });
    await trip.save();
    return getTrip();
  }

  memoryTrip.expenses.push({
    _id: `e-${Date.now()}`,
    title,
    amount,
    paidBy,
    participants,
    category: category || 'other',
    note: note || '',
    paidAt: paidAt || new Date().toISOString(),
  });
  return buildResponse(memoryTrip);
};
