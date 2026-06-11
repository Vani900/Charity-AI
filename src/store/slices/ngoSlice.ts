import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NgoState {
  campaigns: any[];
  requirements: any[];
  pickups: any[];
  analytics: any;
  loading: boolean;
}

const initialState: NgoState = {
  campaigns: [],
  requirements: [],
  pickups: [],
  analytics: null,
  loading: false,
};

const ngoSlice = createSlice({
  name: 'ngo',
  initialState,
  reducers: {
    setCampaigns: (state, action: PayloadAction<any[]>) => {
      state.campaigns = action.payload;
    },
    setRequirements: (state, action: PayloadAction<any[]>) => {
      state.requirements = action.payload;
    },
    setPickups: (state, action: PayloadAction<any[]>) => {
      state.pickups = action.payload;
    },
    setAnalytics: (state, action: PayloadAction<any>) => {
      state.analytics = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setCampaigns, setRequirements, setPickups, setAnalytics, setLoading } = ngoSlice.actions;
export default ngoSlice.reducer;
