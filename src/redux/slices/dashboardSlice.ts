import { createSlice } from '@reduxjs/toolkit';

interface DashboardState {
  appointments: number;
  patientsServed: number;
  revenue: number;
  avgWait: number;
}

const initialState: DashboardState = {
  appointments: 64,
  patientsServed: 51,
  revenue: 101550,
  avgWait: 18,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
});

export default dashboardSlice.reducer;
