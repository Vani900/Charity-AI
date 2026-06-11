import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  darkMode: boolean;
  pushNotifications: boolean;
  emergencyAlerts: boolean;
  language: string;
}

const initialState: SettingsState = {
  darkMode: localStorage.getItem('darkMode') === 'true',
  pushNotifications: localStorage.getItem('pushNotifs') !== 'false', // default true
  emergencyAlerts: localStorage.getItem('emergencyAlerts') !== 'false', // default true
  language: localStorage.getItem('language') || 'English',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
      localStorage.setItem('darkMode', action.payload.toString());
      document.documentElement.classList.toggle('dark', action.payload);
    },
    togglePushNotifications: (state, action: PayloadAction<boolean>) => {
      state.pushNotifications = action.payload;
      localStorage.setItem('pushNotifs', action.payload.toString());
    },
    toggleEmergencyAlerts: (state, action: PayloadAction<boolean>) => {
      state.emergencyAlerts = action.payload;
      localStorage.setItem('emergencyAlerts', action.payload.toString());
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      localStorage.setItem('language', action.payload);
    },
  },
});

export const { toggleDarkMode, togglePushNotifications, toggleEmergencyAlerts, setLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;
