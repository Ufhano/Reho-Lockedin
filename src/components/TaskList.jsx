import TaskCard from './TaskCard'

function TaskList({ title, tasks, onComplete, onDelete, onStartTimer, onUpdate }) {
  return (
    <section className="premium-card">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
          {tasks.length} missions
        </span>
      </div>
      <div className="mt-4 space-y-3.5">
        {tasks.length === 0 ? (
          <p className="text-sm text-slate-500">No tasks here yet.</p>
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
