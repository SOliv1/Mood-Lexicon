import type { MoodEntry } from '../../types/mood';
import { calm } from './calm';
import { uplifted } from './uplifted';
import { peaceful } from './peaceful';
import { energetic } from './energetic';
import { abundance } from './abundance';
import { ethereal } from './ethereal';

export const moods: MoodEntry[] = [calm, uplifted, ethereal, peaceful, energetic, abundance];
