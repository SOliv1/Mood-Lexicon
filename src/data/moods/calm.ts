import type { MoodEntry } from '../../types/mood';

export const calm: MoodEntry = {
  id: 'calm',
  name: 'Calm',
  synonyms: ['serene', 'still', 'quiet', 'soft', 'steady', 'unhurried', 'harmonious', 'peaceful', 'relaxed', 'gentle', 'composed', 'tranquil'],
  related: ['peaceful', 'grounded', 'clear', 'gentle', 'centered', 'balanced', 'mindful', 'content', 'restful', 'soothing', 'reassured', 'collected', 'untroubled'],
  antonyms: [
    "agitated",
    "restless",
    "tense",
    "frantic",
    "overwhelmed",
    "anxious",
    "worried",
    "uneasy",
    "panicked",
    "stressed",
    "frazzled",
    "worked up"
  ],

  behaviours: ['slow breathing', 'softened posture', 'measured responses', 'quiet focus'],
  actions: ['pause for a moment', 'step outside briefly', 'drink water slowly', 'tidy a small area'],
  phrases: ['Take a gentle breath.', 'Let the moment settle.', 'Move with quiet intention.', 'Softness is strength.'],
  quotes: [
    '“Calmness is the cradle of power.” — Josiah Gilbert Holland',
    '“Within you there is a stillness and a sanctuary.” — Hermann Hesse'
  ],
  palette: ['#CFE8F3', '#DDEFF7', '#BBD7E8', '#A7C6D8'],
  season: 'Winter'
};
