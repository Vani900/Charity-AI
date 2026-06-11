import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DonorState {
  donations: any[];
  impact: {
    totalDonated: number;
    peopleHelped: number;
    points: number;
  };
  achievements: any[];
  loading: boolean;
}

const initialState: DonorState = {
  donations: [],
  impact: {
    totalDonated: 0,
    peopleHelped: 0,
    points: 0,
  },
  achievements: [],
  loading: false,
};

const donorSlice = createSlice({
  name: 'donor',
  initialState,
  reducers: {
    setDonations: (state, action: PayloadAction<any[]>) => {
      state.donations = action.payload;
    },
    setImpact: (state, action: PayloadAction<DonorState['impact']>) => {
      state.impact = action.payload;
    },
    setAchievements: (state, action: PayloadAction<any[]>) => {
      state.achievements = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setDonations, setImpact, setAchievements, setLoading } = donorSlice.actions;
export default donorSlice.reducer;
