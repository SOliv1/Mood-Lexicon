import Quote from '../components/Quote/Quote';
import MoodDisplay from '../features/mood/MoodDisplay';
import MoodDetail from '../components/Mood/MoodDetail';
import TasksCard from '../components/Tasks/TasksCard';
import './HomePage.css';
import '../components/Mood/MoodDetail.css';

export default function HomePage() {
  return (
    <div className="homepage">
      <main className="main-content">
        <Quote />
        <TasksCard />
        <MoodDisplay />
        <MoodDetail />
      </main>
    </div>
  );
}
