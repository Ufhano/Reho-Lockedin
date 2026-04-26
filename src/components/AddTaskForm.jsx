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
    <section className="rounded-2xl border border-cyan-400/20 bg-slate-900/40 p-4 shadow-xl shadow-slate-950/40 backdrop-blur md:p-5">
      <h2 className="text-lg font-semibold text-white">Add Task</h2>
      <form className="mt-4 space-y-3" onSubmit={onSubmit}>
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
        <div className="grid grid-cols-3 gap-3">
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
          className="w-full rounded-lg bg-emerald-400 px-4 py-2 font-semibold text-slate-950"
        >
          Add Mission
        </button>
      </form>
    </section>
  )
}

function Input({ label, onChange, ...props }) {
  return (
    <label className="flex flex-col gap-1 text-sm text-cyan-100/80">
      {label}
      <input
        className="rounded-lg border border-cyan-200/20 bg-slate-950/70 px-3 py-2 text-white outline-none focus:border-cyan-400"
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
    </label>
  )
}

function Select({ label, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-1 text-sm text-cyan-100/80">
      {label}
      <select
        className="rounded-lg border border-cyan-200/20 bg-slate-950/70 px-3 py-2 text-white outline-none focus:border-cyan-400"
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
