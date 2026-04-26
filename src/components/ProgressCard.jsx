function ProgressCard({ completed, total, percent }) {
  return (
    <section className="premium-card">
      <h2 className="text-lg font-bold text-slate-900">Daily Progress</h2>
      <p className="mt-1 text-sm text-slate-600">
        {completed} of {total} tasks completed ({percent}%)
      </p>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-zinc-800 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-3 text-sm font-medium text-slate-700">Today&apos;s mission is {percent}% complete</p>
    </section>
  )
}

export default ProgressCard
