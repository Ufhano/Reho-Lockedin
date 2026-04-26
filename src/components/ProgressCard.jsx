function ProgressCard({ completed, total, percent }) {
  return (
    <section className="rounded-2xl border border-cyan-400/20 bg-slate-900/40 p-4 shadow-xl shadow-slate-950/40 backdrop-blur md:p-5">
      <h2 className="text-lg font-semibold text-white">Daily Progress</h2>
      <p className="mt-1 text-sm text-cyan-100/80">
        {completed} of {total} tasks completed ({percent}%)
      </p>
      <div className="mt-4 h-3 rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-3 text-sm text-emerald-200">Today&apos;s mission is {percent}% complete</p>
    </section>
  )
}

export default ProgressCard
