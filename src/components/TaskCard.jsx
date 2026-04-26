import { useState } from 'react'

const priorityStyles = {
  High: 'bg-red-500/20 text-red-200 border-red-300/40',
  Medium: 'bg-amber-500/20 text-amber-100 border-amber-300/40',
  Low: 'bg-emerald-500/20 text-emerald-100 border-emerald-300/40',
}

function TaskCard({ task, onComplete, onDelete, onStartTimer, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState({
    title: task.title,
    category: task.category,
    priority: task.priority,
    estimatedMinutes: task.estimatedMinutes,
    xpReward: task.xpReward,
    coinReward: task.coinReward,
  })

  const saveEdit = () => {
    if (!draft.title.trim()) return
    onUpdate(task.id, {
      ...draft,
      title: draft.title.trim(),
      estimatedMinutes: Number(draft.estimatedMinutes),
      xpReward: Number(draft.xpReward),
      coinReward: Number(draft.coinReward),
    })
    setIsEditing(false)
  }

  const cancelEdit = () => {
    setDraft({
      title: task.title,
      category: task.category,
      priority: task.priority,
      estimatedMinutes: task.estimatedMinutes,
      xpReward: task.xpReward,
      coinReward: task.coinReward,
    })
    setIsEditing(false)
  }

  return (
    <article className="rounded-xl border border-cyan-400/20 bg-slate-950/60 p-4">
      <div className="flex items-start justify-between gap-2">
        {isEditing ? (
          <input
            value={draft.title}
            onChange={(event) => setDraft((prev) => ({ ...prev, title: event.target.value }))}
            className="w-full rounded-lg border border-cyan-300/30 bg-slate-900 px-2 py-1 text-sm text-white"
          />
        ) : (
          <h3 className="text-base font-semibold text-white">{task.title}</h3>
        )}
        {task.completed && (
          <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs font-medium text-emerald-200">
            Cleared
          </span>
        )}
      </div>
      {isEditing ? (
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <select
            value={draft.category}
            onChange={(event) => setDraft((prev) => ({ ...prev, category: event.target.value }))}
            className="rounded-lg border border-cyan-300/30 bg-slate-900 px-2 py-2 text-white"
          >
            <option value="must">Must-Do Mission</option>
            <option value="side">Side Quest</option>
          </select>
          <select
            value={draft.priority}
            onChange={(event) => setDraft((prev) => ({ ...prev, priority: event.target.value }))}
            className="rounded-lg border border-cyan-300/30 bg-slate-900 px-2 py-2 text-white"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <input
            type="number"
            min="1"
            value={draft.estimatedMinutes}
            onChange={(event) =>
              setDraft((prev) => ({ ...prev, estimatedMinutes: event.target.value }))
            }
            className="rounded-lg border border-cyan-300/30 bg-slate-900 px-2 py-2 text-white"
            placeholder="Minutes"
          />
          <input
            type="number"
            min="1"
            value={draft.xpReward}
            onChange={(event) => setDraft((prev) => ({ ...prev, xpReward: event.target.value }))}
            className="rounded-lg border border-cyan-300/30 bg-slate-900 px-2 py-2 text-white"
            placeholder="XP"
          />
          <input
            type="number"
            min="1"
            value={draft.coinReward}
            onChange={(event) => setDraft((prev) => ({ ...prev, coinReward: event.target.value }))}
            className="rounded-lg border border-cyan-300/30 bg-slate-900 px-2 py-2 text-white"
            placeholder="Coins"
          />
        </div>
      ) : (
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <span className={`rounded-full border px-2 py-1 ${priorityStyles[task.priority]}`}>
            {task.priority}
          </span>
          <span className="rounded-full bg-slate-800 px-2 py-1 text-cyan-100">{task.estimatedMinutes} min</span>
          <span className="rounded-full bg-cyan-500/20 px-2 py-1 text-cyan-100">+{task.xpReward} XP</span>
          <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-emerald-100">+{task.coinReward} coins</span>
        </div>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {isEditing ? (
          <>
            <button
              type="button"
              className="rounded-lg bg-emerald-400 px-3 py-2 text-sm font-semibold text-slate-950"
              onClick={saveEdit}
            >
              Save
            </button>
            <button
              type="button"
              className="rounded-lg bg-slate-700 px-3 py-2 text-sm font-semibold text-white"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="rounded-lg bg-emerald-400 px-3 py-2 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => onComplete(task.id)}
              disabled={task.completed}
            >
              Task Cleared
            </button>
            <button
              type="button"
              className="rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-slate-950"
              onClick={() => onStartTimer(task.id)}
            >
              Start Timer
            </button>
          </>
        )}
        {!isEditing && (
          <button
            type="button"
            className="rounded-lg bg-indigo-500 px-3 py-2 text-sm font-semibold text-white"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
        <button
          type="button"
          className="rounded-lg bg-rose-500 px-3 py-2 text-sm font-semibold text-white"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </article>
  )
}

export default TaskCard
