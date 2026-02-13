import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createExpense, createMember, fetchTrip } from './api';

export const loadTrip = createAsyncThunk('trip/loadTrip', fetchTrip);
export const addExpense = createAsyncThunk('trip/addExpense', createExpense);
export const addMember = createAsyncThunk('trip/addMember', createMember);

const applyPayload = (state, action) => {
  state.trip = action.payload.trip;
  state.settlements = action.payload.settlements;
  state.stats = action.payload.stats;
  state.error = null;
};

const tripSlice = createSlice({
  name: 'trip',
  initialState: {
    trip: null,
    settlements: [],
    stats: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadTrip.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadTrip.fulfilled, (state, action) => {
        state.loading = false;
        applyPayload(state, action);
      })
      .addCase(loadTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addExpense.fulfilled, applyPayload)
      .addCase(addMember.fulfilled, applyPayload)
      .addCase(addExpense.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addMember.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default tripSlice.reducer;
