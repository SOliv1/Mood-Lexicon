/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */


import type { MoodEntry } from '../types/mood';


export const moods: MoodEntry[] = [
  {
    id: 'calm',
    name: 'Calm',
    synonyms: ['serene', 'still', 'quiet', 'soft', 'steady', 'unhurried'],
    related: ['peaceful', 'grounded', 'clear', 'gentle'],
    behaviours: ['slow breathing', 'softened posture', 'measured responses', 'quiet focus'],
    actions: ['pause for a moment', 'step outside briefly', 'drink water slowly', 'tidy a small area'],
    phrases: ['Take a gentle breath.', 'Let the moment settle.', 'Move with quiet intention.', 'Softness is strength.'],
    quotes: [
      '“Calmness is the cradle of power.” — Josiah Gilbert Holland',
      '“Within you there is a stillness and a sanctuary.” — Hermann Hesse'
    ],
    palette: ['#CFE8F3', '#DDEFF7', '#BBD7E8', '#A7C6D8'],
    season: 'Winter'
  },

  {
    id: 'uplifted',
    name: 'Uplifted',
    synonyms: ['bright', 'buoyant', 'energised', 'lighthearted', 'hopeful'],
    related: ['optimistic', 'joyful', 'encouraged', 'motivated'],
    behaviours: ['quicker steps', 'open gestures', 'warm tone', 'increased curiosity'],
    actions: ['send a kind message', 'play a favourite song', 'refresh your space', 'share a small win'],
    phrases: ['Let the light in.', 'Carry the good forward.', 'Small joys matter.', 'Energy rises when shared.'],
    quotes: [
      '“Where there is light, there is joy.” — Anne Frank',
      '“Happiness is not something ready-made. It comes from your own actions.” — Dalai Lama'
    ],
    palette: ['#FFE8A3', '#FFD97A', '#FFCC66', '#F9B94E'],
    season: 'Spring'
  },

  {
    id: 'peaceful',
    name: 'Peaceful',
    synonyms: ['harmonious', 'balanced', 'restful', 'content', 'untroubled'],
    related: ['calm', 'clarity', 'acceptance', 'gratitude'],
    behaviours: ['gentle pacing', 'quiet appreciation', 'soft eye contact', 'intentional pauses'],
    actions: ['sit somewhere still', 'write a short reflection', 'lightly stretch', 'reduce one small stressor'],
    phrases: ['Let harmony settle in.', 'Peace begins with a single pause.', 'Hold space for ease.', 'Let the world soften.'],
    quotes: [
      '“Peace begins with a smile.” — Mother Teresa',
      '“Nobody can bring you peace but yourself.” — Ralph Waldo Emerson'
    ],
    palette: ['#E3F6E8', '#D0EED8', '#B8E3C4', '#A2D9B2'],
    season: 'Summer'
  },

  {
    id: 'energetic',
    name: 'Energetic',
    synonyms: ['vibrant', 'dynamic', 'charged', 'alive', 'spirited'],
    related: ['motivated', 'uplifted', 'confident', 'driven'],
    behaviours: ['quick movements', 'strong gestures', 'focused intensity', 'high engagement'],
    actions: ['start a new task', 'move your body', 'organise something fast', 'channel momentum into progress'],
    phrases: ['Lean into the momentum.', 'Let your energy carry you.', 'Move with intention.', 'You’re in motion — keep going.'],
    quotes: [
      '“Energy and persistence conquer all things.” — Benjamin Franklin',
      '“Passion is energy.” — Oprah Winfrey'
    ],
    palette: ['#FFD1DC', '#FF9AA2', '#FF6F91', '#FF4F6D'],
    season: 'Autumn'
  }
];
