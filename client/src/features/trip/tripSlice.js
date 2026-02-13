import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createExpense, createMember, fetchTrip } from './api';

export const loadTrip = createAsyncThunk('trip/loadTrip', fetchTrip);
export const addExpense = createAsyncThunk('trip/addExpense', createExpense);
export const addMember = createAsyncThunk('trip/addMember', createMember);

const tripSlice = createSlice({
  name: 'trip',
  initialState: {
    trip: null,
    settlements: [],
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
        state.trip = action.payload.trip;
        state.settlements = action.payload.settlements;
      })
      .addCase(loadTrip.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.trip = action.payload.trip;
        state.settlements = action.payload.settlements;
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.trip = action.payload.trip;
        state.settlements = action.payload.settlements;
      });
  },
});

export default tripSlice.reducer;
