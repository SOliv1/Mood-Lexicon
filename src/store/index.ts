import { configureStore } from '@reduxjs/toolkit';
import moodReducer from '../features/mood/moodSlice';
import moodLexiconReducer from '../features/mood/moodLexiconSlice';

export const store = configureStore({
  reducer: {
    mood: moodReducer,
    moodLexicon: moodLexiconReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
