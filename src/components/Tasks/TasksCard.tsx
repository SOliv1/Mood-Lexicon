export default function TasksCard() {
  return (
    <section className="tasks-card">
      <h2>What would you like to do today?</h2>

      <div className="tasks-buttons">
        <button className="task-btn water">Water plants</button>
        <button className="task-btn walk">Take dog for a walk</button>
      </div>
    </section>
  );
}
