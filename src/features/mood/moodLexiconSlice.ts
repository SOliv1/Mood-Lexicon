import { createSlice } from '@reduxjs/toolkit';
import { moods } from '../../data/moods';




// Map UI mood → Lexicon mood ID
const moodMap: Record<string, string> = {
  calm: 'calm',
  uplifted: 'uplifted',
  peaceful: 'peaceful',
  energetic: 'energetic',
  abundance: 'abundance',

};

const moodLexiconSlice = createSlice({
  name: 'moodLexicon',
  initialState: {
    moods,
    selectedMood: moods[0]
  },
  reducers: {
    selectMood(state, action) {
      const mood = state.moods.find(m => m.id === action.payload);
      if (mood) state.selectedMood = mood;
    },

    // NEW: Sync lexicon with UI mood
    syncWithUiMood(state, action) {
      const lexiconId = moodMap[action.payload];
      const mood = state.moods.find(m => m.id === lexiconId);
      if (mood) state.selectedMood = mood;
    }
  }
});

export const { selectMood, syncWithUiMood } = moodLexiconSlice.actions;
export default moodLexiconSlice.reducer;
