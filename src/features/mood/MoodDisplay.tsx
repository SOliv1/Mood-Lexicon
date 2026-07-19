import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toggleMood } from './moodSlice';
import { syncWithUiMood } from './moodLexiconSlice';

const moods = ['calm', 'uplifted', 'peaceful', 'energetic'];


const getNextMood = (current: string) => {
  const index = moods.indexOf(current);
  return moods[(index + 1) % moods.length];
};

export default function MoodDisplay() {
  const dispatch = useDispatch();
  const mood = useSelector((state: RootState) => state.mood.currentMood);

  const handleChangeMood = () => {
    const nextMood = getNextMood(mood);
    dispatch(toggleMood());
    dispatch(syncWithUiMood(nextMood));
  };

  return (
    <section className="mood-display">
      <h2>Current Mood: {mood}</h2>
      <button onClick={handleChangeMood}>Change Mood</button>
    </section>
  );
}
