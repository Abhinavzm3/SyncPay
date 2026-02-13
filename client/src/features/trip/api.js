import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const fetchTrip = async () => {
  const { data } = await api.get('/trips/current');
  return data;
};

export const createExpense = async (payload) => {
  const { data } = await api.post('/expenses', payload);
  return data;
};

export const createMember = async (payload) => {
  const { data } = await api.post('/members', payload);
  return data;
};
