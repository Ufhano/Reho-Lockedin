import TaskCard from './TaskCard'

function TaskList({ title, tasks, onComplete, onDelete, onStartTimer, onUpdate }) {
  return (
    <section className="rounded-2xl border border-cyan-400/20 bg-slate-900/40 p-4 shadow-xl shadow-slate-950/40 backdrop-blur md:p-5">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <div className="mt-4 space-y-3">
        {tasks.length === 0 ? (
          <p className="text-sm text-cyan-100/70">No tasks here yet.</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={onComplete}
              onDelete={onDelete}
              onStartTimer={onStartTimer}
              onUpdate={onUpdate}
            />
          ))
        )}
      </div>
    </section>
  )
}

export default TaskList
