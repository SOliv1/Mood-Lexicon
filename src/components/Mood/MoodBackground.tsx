import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface Props {
  children: ReactNode;
}

export default function MoodBackground({ children }: Props) {
  const palette = useSelector((state: RootState) => state.mood.palette);

  const style = {
    background: `linear-gradient(135deg, ${palette[0]} 0%, ${palette[1]} 100%)`,
    minHeight: '100vh',
    padding: '2rem',
  };

  return <div style={style}>{children}</div>;
}
