import { useState } from 'react'

const priorityStyles = 'bg-slate-50 border border-slate-200 text-slate-600'

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
    <article className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/70">
      <div className="flex items-start justify-between gap-2">
        {isEditing ? (
          <input
            value={draft.title}
            onChange={(event) => setDraft((prev) => ({ ...prev, title: event.target.value }))}
            className="premium-input w-full"
          />
        ) : (
          <h3 className="text-base font-bold text-slate-900 md:text-lg">{task.title}</h3>
        )}
        {task.completed && (
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600">
            Cleared
          </span>
        )}
      </div>
      {isEditing ? (
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <select
            value={draft.category}
            onChange={(event) => setDraft((prev) => ({ ...prev, category: event.target.value }))}
            className="premium-input"
          >
            <option value="must">Must-Do Mission</option>
            <option value="side">Side Quest</option>
          </select>
          <select
            value={draft.priority}
            onChange={(event) => setDraft((prev) => ({ ...prev, priority: event.target.value }))}
            className="premium-input"
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
            className="premium-input"
            placeholder="Minutes"
          />
          <input
            type="number"
            min="1"
            value={draft.xpReward}
            onChange={(event) => setDraft((prev) => ({ ...prev, xpReward: event.target.value }))}
            className="premium-input"
            placeholder="XP"
          />
          <input
            type="number"
            min="1"
            value={draft.coinReward}
            onChange={(event) => setDraft((prev) => ({ ...prev, coinReward: event.target.value }))}
            className="premium-input"
            placeholder="Coins"
          />
        </div>
      ) : (
        <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
          <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 ${priorityStyles}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            {task.priority}
          </span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-slate-600">{task.estimatedMinutes} min</span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-slate-600">+{task.xpReward} XP</span>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-slate-600">+{task.coinReward} coins</span>
        </div>
      )}
      <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
        {isEditing ? (
          <>
            <button
              type="button"
              className="premium-btn border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              onClick={saveEdit}
            >
              Save
            </button>
            <button
              type="button"
              className="premium-btn bg-slate-100 text-slate-600 hover:bg-slate-200"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="premium-btn border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              onClick={() => onComplete(task.id)}
              disabled={task.completed}
            >
              Task Cleared
            </button>
            <button
              type="button"
              className="premium-btn bg-zinc-900 text-white shadow-sm hover:bg-zinc-800"
              onClick={() => onStartTimer(task.id)}
            >
              Start Timer
            </button>
          </>
        )}
        {!isEditing && (
          <button
            type="button"
            className="premium-btn bg-slate-100 text-slate-600 hover:bg-slate-200"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
        <button
          type="button"
          className="premium-btn grid h-10 w-10 place-items-center justify-self-end rounded-full border border-slate-200 bg-white p-0 text-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700"
          onClick={() => onDelete(task.id)}
          aria-label="Delete task"
        >
          🗑
        </button>
      </div>
    </article>
  )
}

export default TaskCard
