import { nanoid } from 'nanoid';
import { buildSettlements, calculateBalances } from './settlementService.js';

const trip = {
  id: 'trip-1',
  name: 'Goa Friends Getaway',
  members: [
    { id: 'm1', name: 'Aarav' },
    { id: 'm2', name: 'Siya' },
    { id: 'm3', name: 'Kabir' }
  ],
  expenses: [
    { id: 'e1', title: 'Airport cab', amount: 900, paidBy: 'm1', participants: ['m1', 'm2', 'm3'] },
    { id: 'e2', title: 'Lunch', amount: 1500, paidBy: 'm2', participants: ['m1', 'm2', 'm3'] },
    { id: 'e3', title: 'Scooter fuel', amount: 600, paidBy: 'm3', participants: ['m1', 'm3'] }
  ]
};

const enrichMembers = (currentTrip) => {
  const balances = calculateBalances(currentTrip);
  return currentTrip.members.map((member) => ({ ...member, net: Number((balances[member.id] ?? 0).toFixed(2)) }));
};

export const getTrip = () => {
  const settlements = buildSettlements(trip).settlements;
  return {
    trip: { ...trip, members: enrichMembers(trip) },
    settlements
  };
};

export const addMember = ({ name }) => {
  trip.members.push({ id: nanoid(6), name });
  return getTrip();
};

export const addExpense = ({ title, amount, paidBy, participants }) => {
  trip.expenses.unshift({ id: nanoid(8), title, amount, paidBy, participants });
  return getTrip();
};
