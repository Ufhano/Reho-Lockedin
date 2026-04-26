import { useState } from 'react'

const defaultForm = {
  title: '',
  category: 'must',
  priority: 'Medium',
  estimatedMinutes: 25,
  xpReward: 20,
  coinReward: 10,
}

function AddTaskForm({ onAddTask }) {
  const [form, setForm] = useState(defaultForm)

  const onSubmit = (event) => {
    event.preventDefault()
    if (!form.title.trim()) return

    onAddTask({
      ...form,
      title: form.title.trim(),
      estimatedMinutes: Number(form.estimatedMinutes),
      xpReward: Number(form.xpReward),
      coinReward: Number(form.coinReward),
    })

    setForm(defaultForm)
  }

  return (
    <section className="premium-card">
      <h2 className="text-lg font-bold text-slate-900">Add Task</h2>
      <form className="mt-4 space-y-4" onSubmit={onSubmit}>
        <Input
          label="Task title"
          value={form.title}
          onChange={(value) => setForm((prev) => ({ ...prev, title: value }))}
          placeholder="Enter mission..."
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Select
            label="Category"
            value={form.category}
            onChange={(value) => setForm((prev) => ({ ...prev, category: value }))}
            options={[
              { value: 'must', label: 'Must-Do Mission' },
              { value: 'side', label: 'Side Quest' },
            ]}
          />
          <Select
            label="Priority"
            value={form.priority}
            onChange={(value) => setForm((prev) => ({ ...prev, priority: value }))}
            options={['High', 'Medium', 'Low'].map((item) => ({ value: item, label: item }))}
          />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Input
            type="number"
            min="1"
            label="Minutes"
            value={form.estimatedMinutes}
            onChange={(value) => setForm((prev) => ({ ...prev, estimatedMinutes: value }))}
          />
          <Input
            type="number"
            min="1"
            label="XP"
            value={form.xpReward}
            onChange={(value) => setForm((prev) => ({ ...prev, xpReward: value }))}
          />
          <Input
            type="number"
            min="1"
            label="Coins"
            value={form.coinReward}
            onChange={(value) => setForm((prev) => ({ ...prev, coinReward: value }))}
          />
        </div>
        <button
          type="submit"
          className="premium-btn w-full bg-zinc-900 py-3 text-base text-white shadow-sm hover:bg-zinc-800"
        >
          Add Mission
        </button>
      </form>
    </section>
  )
}

function Input({ label, onChange, ...props }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm text-slate-600">
      {label}
      <input
        className="premium-input"
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
    </label>
  )
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm text-slate-600">
      {label}
      <select
        className="premium-input"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export default AddTaskForm
