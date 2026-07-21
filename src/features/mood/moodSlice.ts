import { createSlice } from '@reduxjs/toolkit';



const uimoods = ['calm', 'uplifted', 'peaceful', 'energetic', 'abundance'];


const moodSlice = createSlice({
  name: 'mood',
  initialState: {
    currentMood: 'calm',
    palette: ['#cce7ff', '#e6f3ff']
  },
  reducers: {
    toggleMood(state) {
      const currentIndex = uimoods.indexOf(state.currentMood);
      const nextIndex = (currentIndex + 1) % uimoods.length;
      state.currentMood = uimoods[nextIndex];
    }
  }
});

export const { toggleMood } = moodSlice.actions;
export default moodSlice.reducer;
